import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { CapabilityPage } from "@/components/capability-page";
import { getCapabilityPage } from "@/app/capabilities";

const page = getCapabilityPage("site-development")!;

export const metadata: Metadata = {
  title: "Site Development & Publishing | Shift Shift Co.",
  description: page.description,
};

export default function SiteDevelopmentPage() {
  return (
    <PageShell>
      <CapabilityPage page={page} />
    </PageShell>
  );
}
