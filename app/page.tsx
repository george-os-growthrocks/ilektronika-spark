import { LandingPage } from "@/components/landing/LandingPage";
import { parseIntent } from "@/lib/intent";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("el");

type PageProps = {
  searchParams: Promise<{ intent?: string | string[] }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  return <LandingPage locale="el" intent={parseIntent(params.intent)} />;
}
