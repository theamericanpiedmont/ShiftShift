import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { CapabilityPage } from "@/components/capability-page";
import { getCapabilityPage } from "@/app/capabilities";

const page = getCapabilityPage("consulting")!;

export const metadata: Metadata = {
  title: "Consulting & Advisory | Shift Shift Co.",
  description: page.description,
};

export default function ConsultingPage() {
  return (
    <PageShell>
      <CapabilityPage page={page} />
    </PageShell>
  );
}
