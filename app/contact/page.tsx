import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavigation } from "@/components/site-navigation";
import { ContactForm } from "@/components/contact-form";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact | Shift Shift Co.",
  description: "Get in touch with Shift Shift Co. about a question, opportunity, or business inquiry.",
};

export default function ContactPage() {
  return (
    <>
      <SiteNavigation />
      <PageShell size="wide">
        <div className={styles.page}>
          <section className={styles.contactIntro} aria-labelledby="contact-title" data-transition-fade>
            <p className={styles.eyebrow}><span className={styles.motif} aria-hidden="true"><i /><i /><i /></span>Contact</p>
            <h1 id="contact-title">Let&apos;s get in touch.</h1>
            <p className={styles.lede}>Have a question, an opportunity, or something you&apos;d like to discuss? We&apos;d love to hear from you.</p>
          </section>
          <section className={styles.formSection} aria-label="Send a message">
            <ContactForm type="contact" />
            <p className={styles.alternative}>Prefer email? Reach us directly at <a href="mailto:consulting@shiftshift.co">consulting@shiftshift.co</a>.</p>
            <Link className={styles.secondaryLink} href="/contact/got-a-problem">Have a business challenge? Tell us about it <span aria-hidden="true">→</span></Link>
          </section>
          <SiteFooter transitionFade>© 2026 Shift Shift Co. LLC</SiteFooter>
        </div>
      </PageShell>
    </>
  );
}
