import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { SiteFooter } from "@/components/site-footer";
import { BrandCapabilityLink, BrandEyesButton } from "@/components/brand-transition";
import { SiteMasthead } from "@/components/site-masthead";
import { capabilityLinks } from "./capabilities";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Shift Shift Co.",
  description:
    "Product development, platforms, publishing systems, pricing tools, research, and strategic advisory from Shift Shift Co.",
};

export default function HomePage() {
  return (
    <PageShell size="wide">
      <SiteMasthead eyes={<BrandEyesButton className={`${styles.brandMark} ${styles.brandButton}`} />} />

      <section className={styles.index} data-transition-fade>
        <nav aria-label="Capabilities" className={styles.capabilityNav}>
          {capabilityLinks.map((capability, index) => (
            <BrandCapabilityLink key={capability.href} href={capability.href} className={styles.capabilityLink}>
              <span className={styles.capabilityNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.capabilityLabel}>{capability.label}</span>
            </BrandCapabilityLink>
          ))}
        </nav>
      </section>

      <SiteFooter transitionFade>© 2026 Shift Shift Co. LLC</SiteFooter>
    </PageShell>
  );
}
