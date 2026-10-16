import { LandingPage } from "@/components/landing/LandingPage";
import { parseIntent } from "@/lib/intent";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en");

type PageProps = {
  searchParams: Promise<{ intent?: string | string[] }>;
};

export default async function EnglishPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return <LandingPage locale="en" intent={parseIntent(params.intent)} />;
}
