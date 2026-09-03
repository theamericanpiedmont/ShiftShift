import { PageShell } from "@/components/page-shell";
import { SiteFooter } from "@/components/site-footer";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <PageShell>
      <section className={styles.hero}>
        <p className={styles.kicker}>Shift Shift Co.</p>
        <h1 className={styles.title}>SHIFT SHIFT CO.</h1>
        <p className={styles.statement}>Technology, products, experiments, and useful things.</p>
        <p className={styles.more}>More soon.</p>
      </section>

      <SiteFooter>© 2026 Shift Shift Co. LLC</SiteFooter>
    </PageShell>
  );
}
