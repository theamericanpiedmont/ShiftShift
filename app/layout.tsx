import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { BrandTransition } from "@/components/brand-transition";

export const metadata: Metadata = {
  metadataBase: new URL("https://shiftshift.co"),
  title: "Shift Shift Co.",
  description:
    "Product development, platforms, publishing systems, pricing tools, research, and strategic advisory from Shift Shift Co.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body><BrandTransition>{children}</BrandTransition></body>
    </html>
  );
}
