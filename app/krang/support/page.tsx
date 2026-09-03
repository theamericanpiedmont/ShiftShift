import type { Metadata } from "next";
import Link from "next/link";
import { ContentSection } from "@/components/content-section";
import { PageShell } from "@/components/page-shell";
import { SiteFooter } from "@/components/site-footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Krang Support | Shift Shift Co.",
  description:
    "Support, troubleshooting, and contact information for the Krang golf-cart telemetry and navigation app.",
};

export default function KrangSupportPage() {
  return (
    <PageShell tone="krang">
      <ContentSection>
        <p className={styles.eyebrow}>Krang</p>
        <h1 className={styles.title}>Krang Support</h1>
        <p className={styles.lead}>Golf-cart telemetry and navigation for Peachtree City.</p>
        <p className={styles.body}>
          Krang is a custom navigation and vehicle telemetry app designed for Project Cartier, a
          2009 E-Z-GO RXV equipped with the Krang telemetry system.
        </p>
      </ContentSection>

      <ContentSection>
        <h2 className={styles.heading}>Need help?</h2>
        <p className={styles.body}>
          If you’re experiencing a problem with Krang, have a question, or want to report a bug,
          contact{" "}
          <a href="mailto:support@shiftshift.co" className={styles.link}>
            support@shiftshift.co
          </a>
          .
        </p>
        <p className={styles.body}>When reporting an issue, please include:</p>
        <ul className={styles.list}>
          <li>Your Krang app version</li>
          <li>Your iPhone model and iOS version</li>
          <li>A brief description of what happened</li>
          <li>Whether the issue involved navigation, Bluetooth telemetry, or both</li>
        </ul>
      </ContentSection>

      <ContentSection>
        <h2 className={styles.heading}>About Krang</h2>
        <p className={styles.body}>
          Krang combines live golf-cart telemetry with navigation designed around Peachtree City’s
          cart-path network.
        </p>
        <p className={styles.body}>Features include:</p>
        <ul className={styles.list}>
          <li>Live speed and vehicle telemetry</li>
          <li>Battery state and electrical data</li>
          <li>Golf-cart path routing</li>
          <li>Turn-by-turn navigation</li>
          <li>Route overview and driver-focused navigation</li>
          <li>Free Drive and north-up map modes</li>
          <li>Bluetooth connectivity to supported Krang hardware</li>
        </ul>
        <p className={styles.body}>
          Krang requires compatible Project Cartier vehicle hardware for live telemetry features.
        </p>
        <p className={styles.body}>
          Navigation coverage is currently focused on the Peachtree City, Georgia golf-cart
          network.
        </p>
      </ContentSection>

      <ContentSection>
        <h2 className={styles.heading}>Privacy</h2>
        <p className={styles.body}>
          Review the{" "}
          <Link href="/krang/privacy" className={styles.link}>
            Krang Privacy Policy
          </Link>
          .
        </p>
      </ContentSection>

      <SiteFooter>
        <p className={styles.footerLine}>Krang is developed by Shift Shift Co. LLC.</p>
        <p className={styles.footerLine}>© 2026 Shift Shift Co. LLC</p>
      </SiteFooter>
    </PageShell>
  );
}
