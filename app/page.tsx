import { LandingPage } from "@/components/landing/LandingPage";
import { parseIntent, parsePaid } from "@/lib/intent";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("el");

type PageProps = {
  searchParams: Promise<{ intent?: string | string[]; paid?: string | string[] }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <LandingPage locale="el" intent={parseIntent(params.intent)} paid={parsePaid(params.paid)} />
  );
}
