"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { Locale } from "@/content/locale";
import { formatInt, formatUsd } from "@/lib/format";

type CountUpProps = {
  value: number;
  locale: Locale;
  suffix?: string;
  currency?: "USD";
  approximate?: boolean;
};

function formatValue(current: number, props: CountUpProps): string {
  if (props.currency === "USD") {
    return formatUsd(props.locale, current, props.approximate);
  }
  return `${formatInt(props.locale, current)}${props.suffix ?? ""}`;
}

export function CountUp(props: CountUpProps) {
  const { value } = props;
  const finalText = formatValue(value, props);
  const [current, setCurrent] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || value === 0) {
      setCurrent(value);
      return;
    }

    let frame = 0;
    let start = 0;
    const duration = 1100;
    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || cancelled) return;
        observer.disconnect();
        const tick = (now: number) => {
          if (cancelled) return;
          if (!start) start = now;
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - progress) ** 3;
          setCurrent(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="inline-grid" aria-label={finalText}>
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {finalText}
      </span>
      <span className="col-start-1 row-start-1" aria-hidden="true">
        {formatValue(current, props)}
      </span>
    </span>
  );
}
