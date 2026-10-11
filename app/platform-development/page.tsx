import type { Metadata } from "next";
import { CapabilityPage } from "@/components/capability-page";
import { getCapabilityPage } from "@/app/capabilities";

const page = getCapabilityPage("platform-development")!;

export const metadata: Metadata = {
  title: "Platform Development | Shift Shift Co.",
  description: page.description,
};

export default function PlatformDevelopmentPage() {
  return (
    <CapabilityPage page={page} />
  );
}
