import type { Metadata } from "next";
import { CapabilityPage } from "@/components/capability-page";
import { getCapabilityPage } from "@/app/capabilities";

const page = getCapabilityPage("consulting")!;

export const metadata: Metadata = {
  title: "Consulting & Advisory | Shift Shift Co.",
  description: page.description,
};

export default function ConsultingPage() {
  return (
    <CapabilityPage page={page} />
  );
}
