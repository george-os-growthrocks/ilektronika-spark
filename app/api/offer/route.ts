import { NextResponse } from "next/server";
import { z } from "zod";
import { CONTACT_EMAIL, DOMAIN } from "@/config/site";

const offerSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(200).optional().default(""),
  amount: z.coerce.number().positive().max(100_000_000),
  deal: z.enum(["buy", "lease"]),
  message: z.string().trim().max(5000).optional().default(""),
  website: z.string().max(200).optional().default(""),
});

function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? "0");
  if (length > 20_000) {
    return NextResponse.json({ delivered: false, error: "invalid" }, { status: 400 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ delivered: false, error: "invalid" }, { status: 400 });
  }

  const parsed = offerSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ delivered: false, error: "invalid" }, { status: 400 });
  }

  const data = parsed.data;
  if (data.website.trim()) {
    return NextResponse.json({ delivered: true });
  }

  const text = [
    `Domain: ${DOMAIN}`,
    `Deal: ${data.deal}`,
    `Amount EUR: ${data.amount}`,
    `Name: ${oneLine(data.name)}`,
    `Email: ${oneLine(data.email)}`,
    `Company: ${oneLine(data.company) || "-"}`,
    "",
    data.message || "-",
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.OFFER_FROM_EMAIL;
  if (!apiKey || !from) {
    return NextResponse.json({ delivered: false, fallback: "mailto" });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [CONTACT_EMAIL],
        reply_to: data.email,
        subject: `Offer for ${DOMAIN}: ${data.amount} EUR (${data.deal})`,
        text,
      }),
    });

    if (!res.ok) {
      console.error("Offer email failed", res.status);
      return NextResponse.json({ delivered: false, fallback: "mailto" }, { status: 502 });
    }

    return NextResponse.json({ delivered: true });
  } catch (error) {
    console.error("Offer email error", error instanceof Error ? error.name : "unknown");
    return NextResponse.json({ delivered: false, fallback: "mailto" }, { status: 502 });
  }
}

export function GET() {
  return NextResponse.json({ error: "method" }, { status: 405 });
}
