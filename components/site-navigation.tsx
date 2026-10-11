import Image from "next/image";
import { BrandCapabilityLink } from "@/components/brand-transition";
import styles from "@/app/page.module.css";

export function SiteNavigation() {
  return (
    <header className={styles.navHeader}>
      <nav className={styles.topNav} aria-label="Primary navigation">
        <BrandCapabilityLink href="/" className={styles.navBrand} ariaLabel="Shift Shift Co. home">
          <Image src="/shifty-eyes2.png" alt="" aria-hidden="true" data-shifty-eyes width={457} height={225} />
          <span className={styles.navWordmark}>
            <span>SHIFT SHIFT</span> <em>co.</em>
          </span>
        </BrandCapabilityLink>
        <div className={styles.navLinks}>
          <BrandCapabilityLink href="/about" className={styles.navLink}>About</BrandCapabilityLink>
          <BrandCapabilityLink href="/contact" className={styles.navLink}>Contact</BrandCapabilityLink>
          <BrandCapabilityLink href="/contact/got-a-problem" className={styles.navCta}>Got a problem?</BrandCapabilityLink>
        </div>
      </nav>
    </header>
  );
}
