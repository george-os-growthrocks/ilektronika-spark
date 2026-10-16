import Link from "next/link";
import { ASKING_PRICE_EUR, CONTACT_EMAIL, DOMAIN } from "@/config/site";
import { getCopy } from "@/content/copy";
import {
  BRANDED_VOLUME,
  HEAD_KD,
  HEAD_TERM,
  HEAD_VOLUME,
  KEYWORDS,
  NON_BRAND_VOLUME,
  REFERRING_DOMAINS,
  SOURCE,
  TRAFFIC_VALUE_USD,
} from "@/content/facts";
import type { Locale } from "@/content/locale";
import { formatEur, formatInt } from "@/lib/format";
import type { Intent } from "@/lib/intent";
import { buyHref, hrefFor, withPaid } from "@/lib/intent";
import { buildJsonLd } from "@/lib/jsonld";
import { LinkedText } from "@/lib/links";
import { CountUp } from "@/components/landing/CountUp";
import { OfferForm } from "@/components/landing/OfferForm";

const primaryBtn =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90";
const quietBtn =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-foreground/15 bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40";

export function LandingPage({
  locale,
  intent,
  paid,
}: {
  locale: Locale;
  intent: Intent | null;
  paid: boolean;
}) {
  const t = getCopy(locale);
  const price = formatEur(locale, ASKING_PRICE_EUR);
  const jsonLd = JSON.stringify(buildJsonLd(locale, t)).replace(/</g, "\\u003c");
  const home = withPaid(hrefFor(locale), paid);
  const buy = buyHref(locale);
  const greek = withPaid(hrefFor("el", intent ?? undefined), paid);
  const english = withPaid(hrefFor("en", intent ?? undefined), paid);

  const sectionLinks = [
    [t.nav.why, "why"],
    [t.nav.keywords, "keywords"],
    [t.nav.included, "included"],
    [t.nav.faq, "faq"],
    [t.nav.contact, "contact"],
  ] as const;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <a href="#content" className="skip-link">
        {t.skip}
      </a>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5">
          <Link href={home} className="truncate text-sm font-semibold tracking-tight">
            {DOMAIN}
          </Link>
          <nav
            className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex"
            aria-label={locale === "el" ? "Ενότητες" : "Sections"}
          >
            {sectionLinks.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="hover:text-foreground">
                {label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <div
              className="flex items-center gap-2 text-sm"
              role="navigation"
              aria-label={t.langLabel}
            >
              <Link
                href={greek}
                hrefLang="el"
                lang="el"
                aria-current={locale === "el" ? "page" : undefined}
                className={locale === "el" ? "font-semibold" : "text-muted-foreground"}
              >
                ΕΛ
              </Link>
              <span aria-hidden="true" className="text-muted-foreground">
                /
              </span>
              <Link
                href={english}
                hrefLang="en"
                lang="en"
                aria-current={locale === "en" ? "page" : undefined}
                className={locale === "en" ? "font-semibold" : "text-muted-foreground"}
              >
                EN
              </Link>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <span className="font-serif text-lg leading-none">{price}</span>
              <a className={primaryBtn} href={buy}>
                {t.hero.buy}
              </a>
              <a className={quietBtn} href={hrefFor(locale, "offer", "contact")}>
                {t.hero.offer}
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="content">
        {paid ? (
          <section
            className="border-b border-border bg-primary text-primary-foreground"
            aria-labelledby="thanks-title"
          >
            <div className="mx-auto max-w-6xl px-5 py-8 md:py-10">
              <h2 id="thanks-title" className="font-serif text-3xl font-semibold tracking-tight">
                {t.thanks.title}
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-primary-foreground/90">
                {t.thanks.lead}
              </p>
              <ol className="mt-4 max-w-2xl list-decimal space-y-2 pl-5 text-sm leading-relaxed">
                {t.thanks.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </section>
        ) : null}
        <section className="mx-auto max-w-6xl px-5 pb-8 pt-10 md:pb-16 md:pt-16">
          <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-6">
            <div className="order-1 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-1">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {t.hero.eyebrow}
              </p>
              <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">
                {t.hero.titleLead ? <span className="block">{t.hero.titleLead}</span> : null}
                <span className="mt-2 block break-words bg-gradient-to-r from-primary to-accent bg-clip-text text-[clamp(1.85rem,7.2vw,4.6rem)] leading-[1.05] text-transparent">
                  {DOMAIN}
                </span>
                <span className="mt-3 block text-2xl font-normal text-muted-foreground sm:text-3xl">
                  {t.hero.titleTail}
                </span>
              </h1>
            </div>

            <p className="order-3 max-w-xl text-lg leading-relaxed text-muted-foreground lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-2">
              {t.hero.sub}
            </p>

            <aside className="order-2 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1">
              <div className="rounded-3xl bg-secondary p-7 text-secondary-foreground shadow-[0_30px_60px_-30px_rgb(43_72_120/0.6)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary-foreground/70">
                  {t.hero.asking}
                </p>
                <p className="mt-2 font-serif text-5xl tracking-tight">{price}</p>
                <p className="mt-3 text-sm leading-relaxed text-secondary-foreground/80">
                  {t.hero.fraction}
                </p>
                <div className="mt-6 flex gap-2">
                  <a className={`${primaryBtn} flex-1 px-3 text-center`} href={buy}>
                    {t.hero.buy}
                  </a>
                  <a
                    className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-secondary-foreground/30 px-3 py-2.5 text-center text-sm font-semibold transition-colors hover:bg-secondary-foreground/10"
                    href={hrefFor(locale, "offer", "contact")}
                  >
                    {t.hero.offer}
                  </a>
                </div>
                <a
                  href={hrefFor(locale, "lease", "contact")}
                  className="mt-4 inline-flex text-sm font-semibold underline underline-offset-4"
                >
                  {t.hero.lease}
                </a>
                <p className="mt-4 border-t border-secondary-foreground/15 pt-4 text-sm leading-relaxed text-secondary-foreground/75">
                  {t.hero.eu}
                </p>
              </div>
            </aside>

            <div className="order-4 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-3">
              <div className="rounded-3xl border border-border bg-surface/70 px-5 py-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  {t.hero.answerLabel}
                </h2>
                <p className="mt-2 text-base leading-relaxed">
                  <LinkedText text={t.hero.answer} />
                </p>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={t.hero.answerLabel}>
                {t.hero.trust.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="stats-heading" className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          <h2
            id="stats-heading"
            className="font-serif text-3xl font-semibold tracking-tight md:text-4xl"
          >
            {t.statsTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t.statsIntro}</p>
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
            <Stat label={t.stats.exact.label} note={t.stats.exact.note}>
              <CountUp value={HEAD_VOLUME} locale={locale} />
            </Stat>
            <Stat label={t.stats.kd.label} note={t.stats.kd.note}>
              <CountUp value={HEAD_KD} locale={locale} />
            </Stat>
            <Stat label={t.stats.category.label} note={t.stats.category.note}>
              <CountUp value={NON_BRAND_VOLUME} locale={locale} />
            </Stat>
            <Stat label={t.stats.brands.label} note={t.stats.brands.note}>
              <CountUp value={BRANDED_VOLUME} locale={locale} suffix="+" />
            </Stat>
            <Stat label={t.stats.links.label} note={t.stats.links.note}>
              <CountUp value={REFERRING_DOMAINS} locale={locale} suffix="+" />
            </Stat>
            <Stat label={t.stats.value.label} note={t.stats.value.note}>
              <CountUp value={TRAFFIC_VALUE_USD} locale={locale} currency="USD" approximate />
            </Stat>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{SOURCE}</p>
        </section>

        <section id="why" className="scroll-mt-24 border-t border-border/80">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <h2 className="max-w-3xl font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              {t.why.title}
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{t.why.intro}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {t.why.points.map((point, index) => (
                <article key={point.title} className="rounded-3xl border border-border bg-card p-6">
                  <h3 className="font-serif text-2xl font-semibold tracking-tight">
                    {point.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{point.body}</p>
                  {index === 1 ? (
                    <div className="mt-5">
                      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        {t.clustersTitle}
                      </h4>
                      <ul className="mt-2">
                        {t.clusters.map((cluster) => (
                          <li
                            key={cluster.id}
                            className="flex items-baseline justify-between gap-4 border-t border-border py-2 text-sm"
                          >
                            <span>{t.clusterLabels[cluster.id]}</span>
                            <span className="font-semibold tabular-nums">
                              {formatInt(locale, cluster.volume)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="keywords" className="scroll-mt-24 border-t border-border/80 bg-surface/50">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              {t.keywords.title}
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{t.keywords.intro}</p>
            <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">{t.keywords.caption}</caption>
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    <th scope="col" className="px-4 py-3 font-semibold">
                      {t.keywords.keyword}
                    </th>
                    <th scope="col" className="w-32 px-4 py-3 text-right font-semibold sm:w-40">
                      {t.keywords.volume}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {KEYWORDS.map((row) => {
                    const head = row.term === HEAD_TERM;
                    return (
                      <tr key={row.term} className={head ? "bg-surface" : "border-t border-border"}>
                        <th scope="row" className="px-4 py-3 font-medium">
                          {row.term}
                          {head ? (
                            <span className="ml-2 inline-flex rounded-full bg-primary/10 px-2 py-0.5 align-middle text-xs font-semibold text-primary">
                              KD {HEAD_KD}
                            </span>
                          ) : null}
                        </th>
                        <td className="px-4 py-3 text-right font-semibold tabular-nums">
                          {formatInt(locale, row.volume)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
                {SOURCE}
              </p>
            </div>
          </div>
        </section>

        <section id="included" className="scroll-mt-24 border-t border-border/80">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              {t.included.title}
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{t.included.intro}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.included.items.map((item, index) => (
                <article key={item.title} className="rounded-3xl border border-border bg-card p-5">
                  <p className="font-serif text-2xl text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="options" className="scroll-mt-24 border-t border-border/80">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              {t.options.title}
            </h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <article className="rounded-3xl border border-primary/30 bg-primary px-6 py-7 text-primary-foreground lg:col-span-2">
                <h3 className="font-serif text-3xl font-semibold tracking-tight">
                  {t.options.buyTitle}
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-primary-foreground/85">
                  <LinkedText
                    text={t.options.buyBody}
                    className="font-semibold underline decoration-primary-foreground/40 underline-offset-4"
                  />
                </p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <a
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-background px-5 py-2.5 text-sm font-semibold text-foreground"
                    href={buy}
                  >
                    {t.hero.buy}
                  </a>
                  <a
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary-foreground/30 px-5 py-2.5 text-sm font-semibold"
                    href={hrefFor(locale, "offer", "contact")}
                  >
                    {t.hero.offer}
                  </a>
                </div>
              </article>
              <article className="rounded-3xl border border-border bg-card px-6 py-7">
                <h3 className="font-serif text-2xl font-semibold tracking-tight">
                  {t.options.leaseTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t.options.leaseBody}
                </p>
                <a
                  href={hrefFor(locale, "lease", "contact")}
                  className="mt-5 inline-flex text-sm font-semibold text-primary underline underline-offset-4"
                >
                  {t.hero.lease}
                </a>
              </article>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">{t.hero.eu}</p>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 border-t border-border/80 bg-surface/50">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              {t.faq.title}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {t.faq.items.map((item) => (
                <article key={item.q} className="rounded-3xl border border-border bg-card p-5">
                  <h3 className="text-base font-semibold leading-snug">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    <LinkedText text={item.a} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 border-t border-border/80">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
                {t.form.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t.form.intro}</p>
              <p className="mt-4">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{t.hero.eu}</p>
            </div>
            <OfferForm key={`${locale}:${intent ?? "none"}`} intent={intent} copy={t.form} />
          </div>
        </section>
      </main>

      <footer className="border-t border-border pb-28 md:pb-12">
        <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted-foreground">
          <nav
            className="flex flex-wrap gap-x-4 gap-y-2"
            aria-label={locale === "el" ? "Ενότητες" : "Sections"}
          >
            {sectionLinks.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="hover:text-foreground">
                {label}
              </a>
            ))}
          </nav>
          <p className="mt-6 max-w-2xl leading-relaxed">{t.footer.disclaimer}</p>
          <p className="mt-3">{SOURCE}</p>
          <p className="mt-6">{t.footer.rights}</p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden">
        <div className="flex items-center gap-2 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="mr-auto">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t.hero.asking}
            </p>
            <p className="font-serif text-xl leading-none">{price}</p>
          </div>
          <a className={quietBtn} href={hrefFor(locale, "offer", "contact")}>
            {t.hero.offerShort}
          </a>
          <a className={primaryBtn} href={buy}>
            {t.hero.buy}
          </a>
        </div>
      </div>
    </>
  );
}

function Stat({
  label,
  note,
  children,
}: {
  label: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-3xl border border-border bg-card px-4 py-5 transition-shadow hover:shadow-lg sm:px-5">
      <p className="font-serif text-3xl tracking-tight text-primary sm:text-4xl">{children}</p>
      <h3 className="mt-2 text-sm font-semibold leading-snug">{label}</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{note}</p>
    </article>
  );
}
