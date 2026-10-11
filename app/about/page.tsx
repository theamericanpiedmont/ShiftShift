import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavigation } from "@/components/site-navigation";
import homeStyles from "@/app/home-sections.module.css";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About | Shift Shift Co.",
  description: "Meet Shift Shift Co. and founder Rick Newkirk.",
};

function Eyebrow({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <p className={`${styles.eyebrow} ${dark ? styles.eyebrowDark : ""}`}>
      <span className={homeStyles.brandMotif} aria-hidden="true"><span /><span /><span /></span>
      <span>{children}</span>
    </p>
  );
}

const linkedInUrl = "https://www.linkedin.com/in/ricknewkirk/";

export default function AboutPage() {
  return (
    <>
      <SiteNavigation />
      <main className={styles.aboutPage}>
        <section className={styles.introduction} aria-labelledby="about-title" data-transition-fade>
          <div className={styles.contentWidth}>
            <Eyebrow dark>About Shift Shift</Eyebrow>
            <h1 className={styles.introTitle} id="about-title">
              <span>A different kind of consulting.</span>
              <em>Built for what&apos;s next.</em>
            </h1>
            <div className={styles.introCopy}>
              <p>
                Most consulting ends with a recommendation. Shift Shift goes further, combining human insight,
                business strategy, and modern technology to turn good ideas into working solutions.
              </p>
              <p>
                We listen, analyze, design, build, and deploy. Whether the answer is a smarter process, a custom tool,
                or an entirely new capability, we start with your business and build around what it actually needs.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.founderSection} aria-labelledby="founder-title" data-transition-fade>
          <div className={styles.contentWidth}>
            <div className={styles.profile}>
              <figure className={styles.portrait}>
                <Image
                  src="/images/rick-newkirk.png"
                  alt="Rick Newkirk"
                  fill
                  sizes="(max-width: 640px) 70vw, (max-width: 800px) 28vw, 230px"
                  className={styles.portraitImage}
                />
              </figure>

              <div className={styles.biography}>
                <Eyebrow>Founder &amp; Principal</Eyebrow>
                <h2 className={styles.profileTitle} id="founder-title">Rick Newkirk</h2>
                <div className={styles.bioCopy}>
                  <p>
                    Rick Newkirk founded Shift Shift after more than a decade at Delta Air Lines, where he worked
                    across revenue analytics, commercial strategy, marketing, customer experience, and digital
                    innovation.
                  </p>
                  <p>
                    His career has been defined by connecting disciplines that don&apos;t always work together, from
                    business strategy and operational problem-solving to designing and building new technology. At
                    Shift Shift, he brings those capabilities together to help businesses solve problems and create
                    opportunities that traditional approaches might overlook.
                  </p>
                  <p>
                    Rick holds an MBA from Indiana University (2013) and a BA in Journalism and Mathematics from
                    Indiana University (2006).
                  </p>
                </div>
                <a className={styles.linkedinLink} href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                  Connect with Rick on LinkedIn ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.associatesSection} aria-labelledby="associates-title" data-transition-fade>
          <div className={`${styles.contentWidth} ${styles.associatesContent}`}>
            <div className={styles.associatesProfile}>
              <div className={styles.comingSoon} role="img" aria-label="Associates network directory coming soon">
                <span className={homeStyles.brandMotif} aria-hidden="true"><span /><span /><span /></span>
                <span className={styles.comingSoonLabel}>Coming Soon</span>
              </div>

              <div className={styles.associatesCopy}>
                <Eyebrow>The Shift Shift Network</Eyebrow>
                <h2 className={styles.profileTitle} id="associates-title">Associates</h2>
                <div className={styles.bioCopy}>
                  <p>
                    Good solutions benefit from different perspectives. Shift Shift works with a growing network of
                    associates across business strategy, analytics, marketing, digital products, and technology
                    development.
                  </p>
                  <p>
                    This flexible approach allows us to bring additional expertise into a project when it&apos;s needed,
                    assembling the right combination of people and capabilities around each client&apos;s challenge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.contentWidth}>
          <SiteFooter transitionFade>© 2026 Shift Shift Co. LLC</SiteFooter>
        </div>
      </main>
    </>
  );
}
