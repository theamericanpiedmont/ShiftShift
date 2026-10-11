"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { PageShell } from "@/components/page-shell";
import { SiteNavigation } from "@/components/site-navigation";
import { HomeFooter } from "@/components/home-footer";
import type { CuratedVoyage } from "@/components/princess-price-dashboard";
import type { CapabilityImage, CapabilityPage as CapabilityPageData } from "@/app/capabilities";
import homeSections from "@/app/home-sections.module.css";
import styles from "./capability-page.module.css";

type CapabilityPageProps = {
  page: CapabilityPageData;
  pricingVoyages?: CuratedVoyage[];
};

const PrincessPriceDashboard = dynamic(
  () => import("./princess-price-dashboard").then((module) => module.PriceDashboard),
  {
    ssr: false,
    loading: () => <p className={styles.demoLoading} role="status">Loading historical pricing…</p>,
  },
);

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

export function CapabilityPage({ page, pricingVoyages }: CapabilityPageProps) {
  const hasPricingDemo = page.slug === "pricing-solutions" && Boolean(pricingVoyages?.length);
  const [demoOpen, setDemoOpen] = useState(false);
  const demoTrigger = useRef<HTMLButtonElement | null>(null);
  const demoClose = useRef<HTMLButtonElement | null>(null);
  const hasOpenedDemo = useRef(false);

  useEffect(() => {
    if (demoOpen) {
      hasOpenedDemo.current = true;
      demoClose.current?.focus({ preventScroll: true });
    } else if (hasOpenedDemo.current) {
      demoTrigger.current?.focus();
    }
  }, [demoOpen]);

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
    <>
      <SiteNavigation />
      <PageShell size="wide" flushTop>
        <div className={styles.page}>
          <div className={styles.content}>
          <section className={styles.hero} data-transition-fade>
            <p className={styles.kicker}>
              <span className={homeSections.brandMotif} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span>Capability</span>
            </p>
            <h1 className={styles.title}>{page.title}</h1>
            <p className={styles.description}>{page.description}</p>
          </section>

      {page.examples ? (
        <section className={styles.section} data-transition-fade>
          <p className={styles.sectionLabel}>Selected examples</p>
          <div
            className={hasVisualStage ? styles.examplesInteractive : styles.examples}
            data-demo-open={demoOpen || undefined}
            data-pricing-demo={hasPricingDemo || undefined}
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
                          {hasPricingDemo ? (
                            <button
                              type="button"
                              className={styles.demoImageTrigger}
                              aria-label="Try the price tracker now"
                              onClick={(event) => {
                                demoTrigger.current = event.currentTarget;
                                setDemoOpen(true);
                              }}
                            >
                              <ExampleImages images={inlineImages} sizes="100vw" priority={false} />
                              <span className={styles.demoImageCue} aria-hidden="true">TRY THE PRICE TRACKER NOW →</span>
                            </button>
                          ) : (
                            <ExampleImages
                              images={inlineImages}
                              sizes="(max-width: 760px) 100vw, 50vw"
                              priority={hasInteractiveExamples && example.title === examplesWithImages?.[0]?.title}
                            />
                          )}
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>

            {stageImages.length ? (
              <div className={styles.visualStage} aria-live={hasInteractiveExamples ? "polite" : undefined}>
                {demoOpen && pricingVoyages ? (
                  <div className={styles.demoExpandedPanel} role="region" aria-label="Interactive travel price monitoring demo">
                    <button
                      ref={demoClose}
                      type="button"
                      className={styles.demoClose}
                      aria-label="Close interactive demo"
                      onClick={() => setDemoOpen(false)}
                    >
                      ×
                    </button>
                    <PrincessPriceDashboard
                      voyages={pricingVoyages}
                      defaultVoyageId={
                        pricingVoyages.find(
                          (voyage) => voyage.itinerary === "7-Day Eastern Caribbean with St. Thomas",
                        )?.id ?? pricingVoyages[0].id
                      }
                      defaultCabin="Oceanview"
                      historicalLabel="Historical pricing window. Archived observations only."
                      scrollToInterfaceOnMount
                    />
                  </div>
                ) : (
                  <figure key={hasInteractiveExamples ? activeExample?.title : "static"} className={styles.visualPanel} data-visible>
                    <div className={styles.visualFrame} data-stage-frame>
                      {hasPricingDemo ? (
                        <button
                          type="button"
                          className={styles.demoImageTrigger}
                          aria-label="Try the price tracker now"
                          onClick={(event) => {
                            demoTrigger.current = event.currentTarget;
                            setDemoOpen(true);
                          }}
                        >
                          <ExampleImages images={stageImages} sizes="(max-width: 760px) 100vw, (max-width: 1200px) 44vw, 640px" priority />
                          <span className={styles.demoImageCue} aria-hidden="true">TRY THE PRICE TRACKER NOW →</span>
                        </button>
                      ) : (
                        <ExampleImages
                          images={stageImages}
                          sizes="(max-width: 760px) 100vw, (max-width: 1200px) 44vw, 640px"
                          priority={!hasInteractiveExamples || activeExample?.title === examplesWithImages?.[0]?.title}
                        />
                      )}
                    </div>
                  </figure>
                )}
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
          <HomeFooter />
        </div>
      </PageShell>
    </>
  );
}
