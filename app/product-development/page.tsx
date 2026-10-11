import type { Metadata } from "next";
import { CapabilityPage } from "@/components/capability-page";
import { getCapabilityPage } from "@/app/capabilities";

const page = getCapabilityPage("product-development")!;

export const metadata: Metadata = {
  title: "Product Development | Shift Shift Co.",
  description: page.description,
};

export default function ProductDevelopmentPage() {
  return (
    <CapabilityPage page={page} />
  );
}
