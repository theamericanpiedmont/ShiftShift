import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavigation } from "@/components/site-navigation";
import { ContactForm } from "@/components/contact-form";
import styles from "../contact.module.css";

export const metadata: Metadata = {
  title: "Got a Problem? | Shift Shift Co.",
  description: "Tell Shift Shift Co. about a business challenge, and let's start figuring out what's possible.",
};

export default function GotAProblemPage() {
  return (
    <>
      <SiteNavigation />
      <PageShell size="wide">
        <div className={styles.problemPage}>
          <section className={styles.problemIntro} aria-labelledby="problem-title" data-transition-fade>
            <p className={styles.eyebrow}><span className={styles.motif} aria-hidden="true"><i /><i /><i /></span>Got a problem?</p>
            <h1 id="problem-title">Good. We like <em>interesting problems.</em></h1>
            <div className={styles.problemCopy}>
              <p>Every business has something that could work better. Maybe it&apos;s a process that takes too long, an opportunity you haven&apos;t figured out how to pursue, or an idea that needs bringing to life.</p>
              <p>You don&apos;t need to arrive with the answer. Tell us what&apos;s happening, and we&apos;ll start figuring out what&apos;s possible.</p>
            </div>
          </section>
          <section className={styles.problemForm} aria-labelledby="problem-form-title">
            <h2 id="problem-form-title">Tell us what&apos;s on your mind.</h2>
            <ContactForm type="problem" />
          </section>
          <SiteFooter transitionFade>© 2026 Shift Shift Co. LLC</SiteFooter>
        </div>
      </PageShell>
    </>
  );
}
