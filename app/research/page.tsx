import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { CapabilityPage } from "@/components/capability-page";
import { getCapabilityPage } from "@/app/capabilities";

const page = getCapabilityPage("research")!;

export const metadata: Metadata = {
  title: "Research & Analysis | Shift Shift Co.",
  description: page.description,
};

export default function ResearchPage() {
  return (
    <PageShell>
      <CapabilityPage page={page} />
    </PageShell>
  );
}
