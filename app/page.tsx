import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { SiteFooter } from "@/components/site-footer";
import { BrandCapabilityLink, BrandEyesButton } from "@/components/brand-transition";
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
      <section className={styles.hero}>
        <div className={styles.brandLockup}>
          <BrandEyesButton className={`${styles.brandMark} ${styles.brandButton}`} />
          <h1 className={styles.title} data-transition-fade>
            <span className={styles.titleMain}>SHIFT SHIFT</span>
            <span className={styles.titleCompany}>co.</span>
          </h1>
        </div>
        <p className={styles.statement} data-transition-fade>
          Bring us your hardest problem. We’ll turn it into your biggest strength.
        </p>
      </section>

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
