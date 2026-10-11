import Image from "next/image";
import { BrandCapabilityLink } from "@/components/brand-transition";
import { BrandDivider } from "@/components/brand-divider";
import styles from "@/app/page.module.css";
import sections from "@/app/home-sections.module.css";

export function HomeFooter() {
  return (
    <footer className={`${sections.darkBand} ${sections.footerBand} ${sections.homeFooter}`} role="contentinfo" data-transition-fade>
      <div className={sections.footerInner}>
        <section className={sections.footerInvitation} aria-labelledby="closing-title">
          <h2 className={sections.footerHeadline} id="closing-title">
            Got a problem?<br /><em>Let&apos;s take a look.</em>
          </h2>
          <div className={sections.footerActions}>
            <BrandCapabilityLink href="/contact/got-a-problem" className={styles.heroPrimaryAction}>
              Got a problem? <span aria-hidden="true">→</span>
            </BrandCapabilityLink>
            <a className={styles.heroSecondaryAction} href="#selected-work">See our work</a>
          </div>
        </section>

        <BrandDivider tone="dark" />

        <div className={sections.footerColumns}>
          <div className={sections.footerBrandColumn}>
            <BrandCapabilityLink href="/" className={sections.footerBrand} ariaLabel="Shift Shift Co. home">
              <Image src="/shifty-eyes2.png" alt="" aria-hidden="true" width={457} height={225} />
              <span><strong>SHIFT SHIFT</strong> <em>co.</em></span>
            </BrandCapabilityLink>
            <p>Bespoke solutions for businesses that aren&apos;t off the shelf.</p>
          </div>
          <nav className={sections.footerColumn} aria-label="Explore">
            <h3>Explore</h3>
            <a href="#selected-work">Work</a>
            <a href="#what-we-do">Services</a>
            <BrandCapabilityLink href="/about" className={sections.footerLink}>About</BrandCapabilityLink>
            <BrandCapabilityLink href="/contact" className={sections.footerLink}>Contact</BrandCapabilityLink>
          </nav>
          <div className={sections.footerColumn}>
            <h3>What we do</h3>
            <span>Strategy</span>
            <span>Systems &amp; Tools</span>
            <span>Custom Solutions</span>
          </div>
          <div className={sections.footerColumn}>
            <h3>Contact</h3>
            <a href="mailto:consulting@shiftshift.co">consulting@shiftshift.co</a>
            <span>Atlanta, GA</span>
          </div>
        </div>

        <div className={sections.footerBottom}>
          <span>© 2026 Shift Shift Co.</span>
          <span>Atlanta, GA</span>
        </div>
      </div>
    </footer>
  );
}
