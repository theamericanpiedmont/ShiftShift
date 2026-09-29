import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { CapabilityPage } from "@/components/capability-page";
import { getCapabilityPage } from "@/app/capabilities";

const page = getCapabilityPage("platform-development")!;

export const metadata: Metadata = {
  title: "Platform Development | Shift Shift Co.",
  description: page.description,
};

export default function PlatformDevelopmentPage() {
  return (
    <PageShell>
      <CapabilityPage page={page} />
    </PageShell>
  );
}
