import type { Metadata } from "next";
import Image from "next/image";
import { BrandCapabilityLink } from "@/components/brand-transition";
import { BrandDivider } from "@/components/brand-divider";
import { HomeFooter } from "@/components/home-footer";
import { HomeHorizontalScroller } from "@/components/home-horizontal-scroller";
import { PageShell } from "@/components/page-shell";
import { SiteNavigation } from "@/components/site-navigation";
import { capabilityLinks } from "./capability-routes";
import styles from "./page.module.css";
import sections from "./home-sections.module.css";

export const metadata: Metadata = {
  title: "Shift Shift Co.",
  description:
    "Shift Shift is a business consultancy helping organizations solve problems, uncover opportunities, and create bespoke solutions through strategy, analytics, design, and development.",
};

const capabilityByLabel = new Map(capabilityLinks.map((capability) => [capability.label, capability]));

const services = [
  {
    number: "01",
    title: "Strategy",
    description: "Find the right opportunities, clarify priorities, and make better decisions about what comes next.",
    capabilityLabels: ["Consulting & Advisory", "Research & Analysis"],
  },
  {
    number: "02",
    title: "Systems & Tools",
    description: "Improve the way your business works with smarter processes, practical tools, and thoughtful automation.",
    capabilityLabels: ["Pricing & Decision Solutions", "Site Development & Publishing"],
  },
  {
    number: "03",
    title: "Custom Solutions",
    description: "When existing solutions fall short, we design and build something that fits your business.",
    capabilityLabels: ["Product Development", "Platform Development"],
  },
].map((service) => ({
  ...service,
  capabilities: service.capabilityLabels.flatMap((label) => {
    const capability = capabilityByLabel.get(label);
    return capability ? [capability] : [];
  }),
}));

const methodStages = [
  { number: "01", name: "Analyze", description: "Understand the business, customers, and opportunities before deciding what’s worth solving." },
  { number: "02", name: "Design", description: "Find a practical, thoughtful approach that fits the business and the people using it." },
  { number: "03", name: "Build", description: "Turn the plan into something real, useful, and usable." },
  { number: "04", name: "Deploy", description: "Put the solution to work, learn from it, and keep improving." },
];

const selectedWork: {
  title: string;
  category: string;
  description: string;
  href: string;
  images: { src: string; alt: string }[];
}[] = [
  {
    title: "Travel pricing curve prediction",
    category: "Travel & Data",
    description: "A custom tool to track cruise pricing, surface opportunities, and make smarter decisions.",
    href: "/pricing-solutions",
    images: [{ src: "/images/portfolio-princess.png", alt: "Princess cruise ship on the water at sunset" }],
  },
  {
    title: "Community navigation app build",
    category: "Platform Development",
    description: "A native iPhone app for Peachtree City that plans the best golf-cart routes.",
    href: "/product-development",
    images: [{
      src: "/images/portfolio-carty.png",
      alt: "Golf-cart setting with a phone displaying an illustrative Carty Z navigation interface",
    }],
  },
  {
    title: "The American Piedmont",
    category: "Research & Storytelling",
    description: "A digital history project exploring Reconstruction in Georgia through essays, artifacts, and research.",
    href: "/site-development",
    images: [{
      src: "/images/portfolio-piedmont.png",
      alt: "Editorial composite featuring a portrait of Rufus Bullock, Georgia documents, and a map",
    }],
  },
];

function BrandMotif() {
  return (
    <span className={sections.brandMotif} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className={sections.sectionEyebrow}>
      <BrandMotif />
      <span>{children}</span>
    </p>
  );
}

function WorkImages({ images, title }: { images: { src: string; alt: string }[]; title: string }) {
  return (
    <div className={sections.workVisual} role="group" aria-label={`${title} images`}>
      {images.map((image) => (
        <Image
          key={image.alt}
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 82vw, (max-width: 900px) 46vw, 18rem"
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <SiteNavigation />
      <PageShell size="wide" flushTop>
      <div className={styles.homepage}>
        <section className={styles.homeHero} aria-labelledby="home-title" data-transition-fade>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopyColumn}>
              <p className={styles.heroEyebrow}>
                <BrandMotif />
                <span>Strategy · Systems · Solutions</span>
              </p>
              <h1 className={styles.heroHeadline} id="home-title">
                <span>Your business isn&apos;t off the shelf.</span>
                <em>Your solutions shouldn&apos;t be either.</em>
              </h1>
              <p className={styles.heroDescription}>
                We combine business strategy, analytical thinking, and creative problem-solving to help companies
                work smarter and grow. Sometimes that means finding a better way forward. Sometimes it means
                designing a new process, building a custom tool, or creating something that didn&apos;t exist before.
                Whatever the challenge, we start with your business. Not a solution off the shelf.
              </p>
              <div className={styles.heroActions}>
                <BrandCapabilityLink href="/contact/got-a-problem" className={styles.heroPrimaryAction}>
                  Tell us your problem <span aria-hidden="true">→</span>
                </BrandCapabilityLink>
                <a className={styles.heroSecondaryAction} href="#selected-work">Explore our work</a>
              </div>
            </div>
            <div className={styles.heroArtwork} aria-hidden="true">
              <Image
                src="/shifty-eyes2.png"
                alt=""
                width={457}
                height={225}
                priority
                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 42vw, 25rem"
              />
            </div>
          </div>
        </section>

        <section className={sections.whatWeDo} id="what-we-do" aria-labelledby="services-title" data-transition-fade>
          <SectionEyebrow>What we do</SectionEyebrow>
          <div className={sections.editorialIntro}>
            <h2 className={sections.editorialHeadline} id="services-title">
              Bespoke solutions for <em>what&apos;s next.</em>
            </h2>
            <div className={sections.editorialAside}>
              <p>
                We combine strategic thinking, operational know-how, and custom technology to solve real business
                problems. The right solution depends on what your business actually needs.
              </p>
              <span className={sections.orangeDash} aria-hidden="true" />
            </div>
          </div>
          <div className={sections.serviceGrid}>
            {services.map((service) => (
              <article className={sections.serviceColumn} key={service.number}>
                <span className={sections.serviceNumber}>{service.number}</span>
                <h3 className={sections.serviceTitle}>{service.title}</h3>
                <p className={sections.serviceDescription}>{service.description}</p>
                <ul className={sections.serviceLinks} aria-label={`${service.title} capabilities`}>
                  {service.capabilities.map((capability) => (
                    <li key={capability.href}>
                      <BrandCapabilityLink href={capability.href} className={sections.serviceLink}>
                        {capability.label} <span aria-hidden="true">→</span>
                      </BrandCapabilityLink>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <BrandDivider />

        <section className={`${sections.darkBand} ${sections.philosophy}`} aria-labelledby="philosophy-title" data-transition-fade>
          <div className={sections.philosophyGrid}>
            <h2 className={sections.pullQuote} id="philosophy-title">
              <span>A different way of</span>
              <span><em>thinking.</em></span>
              <span>A better way of</span>
              <span><em>doing.</em></span>
            </h2>
            <div className={sections.philosophyCopy}>
              <SectionEyebrow>Why Shift Shift?</SectionEyebrow>
              <p>
                Shift Shift began as a second shift: a place to explore ideas, make things, and follow curiosity beyond
                the workday.
              </p>
              <p>
                Today, it&apos;s built on the same instinct. We bring analytical thinking and creative imagination together,
                challenge the obvious answer, and find new ways to move businesses forward.
              </p>
              <p className={sections.philosophyClose}>Shift your perspective. Shift what&apos;s possible.</p>
              <span className={sections.orangeDash} aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className={sections.howWeWork} aria-labelledby="method-title" data-transition-fade>
          <SectionEyebrow>How we work</SectionEyebrow>
          <div className={sections.editorialIntro}>
            <h2 className={sections.editorialHeadline} id="method-title">From insight to <em>impact.</em></h2>
            <div className={sections.editorialAside}>
              <p>
                Every project is different, but our approach follows a clear path: from understanding what&apos;s worth
                solving to designing the right solution, building it, and putting it to work.
              </p>
              <span className={sections.orangeDash} aria-hidden="true" />
            </div>
          </div>
          <div className={sections.methodGrid}>
            {methodStages.map((stage) => (
              <article className={sections.methodStep} key={stage.number}>
                <span className={sections.methodNumber}>{stage.number}</span>
                <h3 className={sections.methodName}>{stage.name}</h3>
                <p className={sections.methodDescription}>{stage.description}</p>
              </article>
            ))}
          </div>
        </section>

        <BrandDivider />

        <section className={sections.work} id="selected-work" aria-labelledby="work-title" data-transition-fade>
          <SectionEyebrow>Selected work</SectionEyebrow>
          <div className={sections.editorialIntro}>
            <h2 className={sections.editorialHeadline} id="work-title">Real problems. <em>Real results.</em></h2>
            <div className={sections.editorialAside}>
              <p>A few examples of how we turn complex challenges into practical, working solutions.</p>
              <span className={sections.orangeDash} aria-hidden="true" />
            </div>
          </div>
          <HomeHorizontalScroller label="Selected work" className={sections.projectRail}>
            {selectedWork.map((project) => (
              <BrandCapabilityLink
                href={project.href}
                className={sections.project}
                ariaLabel={`Explore ${project.title}`}
                key={project.title}
              >
                <WorkImages images={project.images} title={project.title} />
                <div className={sections.projectMeta}>{project.category}</div>
                <h3 className={sections.projectTitle}>{project.title}</h3>
                <p className={sections.projectDescription}>{project.description}</p>
                <span className={sections.projectAction} aria-hidden="true">→</span>
              </BrandCapabilityLink>
            ))}
          </HomeHorizontalScroller>
        </section>

        <HomeFooter />
      </div>
      </PageShell>
    </>
  );
}
