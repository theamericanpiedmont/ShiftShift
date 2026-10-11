import type { Metadata } from "next";
import { CapabilityPage } from "@/components/capability-page";
import { getCapabilityPage } from "@/app/capabilities";

const page = getCapabilityPage("research")!;

export const metadata: Metadata = {
  title: "Research & Analysis | Shift Shift Co.",
  description: page.description,
};

export default function ResearchPage() {
  return (
    <CapabilityPage page={page} />
  );
}
