import { CONTACT_EMAIL, DOMAIN } from "@/config/site";

export type Deal = "buy" | "lease";

export type OfferFields = {
  name: string;
  email: string;
  company: string;
  amount: string;
  deal: Deal;
  message: string;
};

export function offerMailto(input: OfferFields): string {
  const subject = `Offer for ${DOMAIN} (${input.deal})`;
  const body = [
    `Domain: ${DOMAIN}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Company: ${input.company || "-"}`,
    `Deal: ${input.deal}`,
    `Amount EUR: ${input.amount}`,
    "",
    input.message,
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
