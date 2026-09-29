"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShiftyEyesVector } from "@/components/shifty-eyes-vector";
import { useBrandTransitionClick } from "@/components/brand-transition";
import type { CapabilityImage, CapabilityPage as CapabilityPageData } from "@/app/capabilities";
import styles from "./capability-page.module.css";
import homeStyles from "@/app/page.module.css";

type CapabilityPageProps = {
  page: CapabilityPageData;
};

function ExampleImages({
  images,
  sizes,
  priority,
}: {
  images: CapabilityImage[];
  sizes: string;
  priority: boolean;
}) {
  const content = images.map((image) => (
    <Image
      key={image.alt}
      src={image.src}
      alt={image.alt}
      className={styles.visualImage}
      sizes={sizes}
      quality={95}
      priority={priority}
    />
  ));

  return images.length > 1 ? <div className={styles.visualPair}>{content}</div> : content;
}

export function CapabilityPage({ page }: CapabilityPageProps) {
  const onHomeClick = useBrandTransitionClick();
  const examplesWithImages = page.examples?.filter((example) => example.image || example.images?.length);
  const hasInteractiveExamples = Boolean(examplesWithImages?.length);
  const hasVisualStage = hasInteractiveExamples || Boolean(page.staticVisual);
  const [activeExampleTitle, setActiveExampleTitle] = useState(
    examplesWithImages?.[0]?.title ?? null,
  );
  const activeExample =
    examplesWithImages?.find((example) => example.title === activeExampleTitle) ??
    examplesWithImages?.[0];
  const stageImages = page.staticVisual
    ? [page.staticVisual]
    : activeExample?.images ?? (activeExample?.image ? [activeExample.image] : []);

  return (
    <div className={styles.page}>
      <div className={styles.homeLinkSpace} aria-hidden="true" />
      <div className={styles.homeAnchor}>
        <div className={homeStyles.hero}>
          <div className={homeStyles.brandLockup}>
            <Link
              href="/"
              className={`${homeStyles.brandMark} ${styles.homeLink}`}
              aria-label="Back to Shift Shift Co. home"
              data-shifty-eyes
              prefetch
              onClick={onHomeClick ?? undefined}
            >
              <ShiftyEyesVector />
            </Link>
            <span className={`${homeStyles.title} ${styles.anchorReference}`} aria-hidden="true">
              <span className={homeStyles.titleMain}>SHIFT SHIFT</span>
              <span className={homeStyles.titleCompany}>co.</span>
            </span>
          </div>
        </div>
      </div>

      <section className={styles.hero} data-transition-fade>
        <p className={styles.kicker}>Capability</p>
        <h1 className={styles.title}>{page.title}</h1>
        <p className={styles.description}>{page.description}</p>
      </section>

      {page.examples ? (
        <section className={styles.section} data-transition-fade>
          <p className={styles.sectionLabel}>Selected examples</p>
          <div
            className={hasVisualStage ? styles.examplesInteractive : styles.examples}
          >
            <div className={styles.examplesList}>
              {page.examples.map((example, index) => {
                const isActive = hasInteractiveExamples && example.title === activeExample?.title;
                const inlineImages = hasInteractiveExamples
                  ? example.images ?? (example.image ? [example.image] : [])
                  : index === 0
                    ? page.staticVisual ? [page.staticVisual] : []
                    : [];

                return (
                  <article
                    key={example.title}
                    className={styles.example}
                    data-active={isActive || undefined}
                  >
                    {hasInteractiveExamples && inlineImages.length ? (
                      <button
                        type="button"
                        className={styles.exampleTrigger}
                        onMouseEnter={() => setActiveExampleTitle(example.title)}
                        onFocus={() => setActiveExampleTitle(example.title)}
                        onClick={() => setActiveExampleTitle(example.title)}
                        aria-pressed={isActive}
                      >
                        <div className={styles.exampleHeader}>
                          <h2 className={styles.exampleTitle}>{example.title}</h2>
                          {example.label && isActive ? (
                            <span className={styles.srOnly}>{example.label}</span>
                          ) : null}
                        </div>
                        <p className={styles.exampleDescription}>{example.description}</p>
                      </button>
                    ) : (
                      <>
                        <div className={styles.exampleHeader}>
                          <h2 className={styles.exampleTitle}>{example.title}</h2>
                          {example.label ? <p className={styles.exampleMeta}>{example.label}</p> : null}
                        </div>
                        <p className={styles.exampleDescription}>{example.description}</p>
                      </>
                    )}

                    {inlineImages.length ? (
                      <div className={styles.exampleInlineVisual}>
                        <div className={styles.visualFrame}>
                          <ExampleImages
                            images={inlineImages}
                            sizes="(max-width: 760px) 100vw, 50vw"
                            priority={hasInteractiveExamples && example.title === examplesWithImages?.[0]?.title}
                          />
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>

            {stageImages.length ? (
              <div className={styles.visualStage} aria-live={hasInteractiveExamples ? "polite" : undefined}>
                <figure key={hasInteractiveExamples ? activeExample?.title : "static"} className={styles.visualPanel} data-visible>
                  <div className={styles.visualFrame} data-stage-frame>
                    <ExampleImages
                      images={stageImages}
                      sizes="(max-width: 760px) 100vw, (max-width: 1200px) 44vw, 640px"
                      priority={!hasInteractiveExamples || activeExample?.title === examplesWithImages?.[0]?.title}
                    />
                  </div>
                </figure>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {page.focusAreas ? (
        <section className={styles.section} data-transition-fade>
          <p className={styles.sectionLabel}>Areas of focus</p>
          <ul className={styles.focusList}>
            {page.focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          {page.cta && !page.editorialParagraphs?.length ? (
            <p className={styles.cta}>
              {page.ctaHref ? (
                <a href={page.ctaHref} className={styles.ctaLink}>
                  {page.cta}
                </a>
              ) : (
                page.cta
              )}
            </p>
          ) : null}
          {page.ctaSecondary && !page.editorialParagraphs?.length ? (
            <p className={styles.ctaSecondary}>
              <a href={page.ctaHref} className={styles.ctaSecondaryLink}>
                {page.ctaSecondary}
              </a>
            </p>
          ) : null}
          {page.note ? <p className={styles.note}>{page.note}</p> : null}
        </section>
      ) : null}

      {page.editorialParagraphs?.length ? (
        <section className={styles.section} data-transition-fade>
          {page.editorialHeading ? (
            <h2 className={styles.editorialHeading}>{page.editorialHeading}</h2>
          ) : null}
          <div className={styles.editorialBody}>
            {page.editorialParagraphs.map((paragraph) => (
              <p key={paragraph} className={styles.editorialParagraph}>
                {paragraph}
              </p>
            ))}
          </div>
          {page.ctaSupport ? <p className={styles.ctaSupport}>{page.ctaSupport}</p> : null}
          {page.cta ? (
            <p className={styles.cta}>
              {page.ctaHref ? (
                <a href={page.ctaHref} className={styles.ctaLink}>
                  {page.cta}
                </a>
              ) : (
                page.cta
              )}
            </p>
          ) : null}
          {page.ctaSecondary ? (
            <p className={styles.ctaSecondary}>
              <a href={page.ctaHref} className={styles.ctaSecondaryLink}>
                {page.ctaSecondary}
              </a>
            </p>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
