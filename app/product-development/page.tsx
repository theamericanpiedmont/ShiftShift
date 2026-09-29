import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { CapabilityPage } from "@/components/capability-page";
import { getCapabilityPage } from "@/app/capabilities";

const page = getCapabilityPage("product-development")!;

export const metadata: Metadata = {
  title: "Product Development | Shift Shift Co.",
  description: page.description,
};

export default function ProductDevelopmentPage() {
  return (
    <PageShell>
      <CapabilityPage page={page} />
    </PageShell>
  );
}
