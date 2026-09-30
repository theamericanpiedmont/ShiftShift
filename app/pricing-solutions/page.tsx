import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { CapabilityPage } from "@/components/capability-page";
import { getCapabilityPage } from "@/app/capabilities";
import { getPrincessVoyages } from "@/lib/princess-history";

const page = getCapabilityPage("pricing-solutions")!;

export const metadata: Metadata = {
  title: "Pricing & Decision Solutions | Shift Shift Co.",
  description: page.description,
};

export default function PricingSolutionsPage() {
  return (
    <PageShell>
      <CapabilityPage page={page} pricingVoyages={getPrincessVoyages()} />
    </PageShell>
  );
}
