import type { ReactNode } from "react";
import styles from "@/app/page.module.css";

type SiteMastheadProps = {
  eyes: ReactNode;
  capabilityPage?: boolean;
};

export function SiteMasthead({ eyes, capabilityPage = false }: SiteMastheadProps) {
  const wordmark = (
    <>
      <span className={styles.titleMain}>SHIFT SHIFT</span>
      <span className={styles.titleCompany}>co.</span>
    </>
  );

  const content = (
    <>
      <div className={styles.brandLockup}>
        {eyes}
        {capabilityPage ? (
          <span className={`${styles.title} ${styles.capabilityWordmark}`} aria-hidden="true">
            {wordmark}
          </span>
        ) : (
          <h1 className={styles.title} data-transition-fade>
            {wordmark}
          </h1>
        )}
      </div>
      <p className={styles.statement} data-transition-fade={!capabilityPage || undefined}>
        <span>Bring us your hardest problem. We’ll turn it into your biggest strength.</span>
        <span className={styles.statementRhythm}>Analyze. Design. Build. Deploy.</span>
      </p>
    </>
  );

  const className = `${styles.hero}${capabilityPage ? ` ${styles.capabilityMasthead}` : ""}`;

  return capabilityPage ? (
    <div className={className}>{content}</div>
  ) : (
    <section className={className}>{content}</section>
  );
}
