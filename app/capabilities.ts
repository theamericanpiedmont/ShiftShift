import type { StaticImageData } from "next/image";
import syn1 from "@/images/Syn1.png";
import syn2 from "@/images/Syn2.png";
import syn3 from "@/images/Syn3.png";
import tap from "@/images/TAP.png";
import crackback from "@/images/crackback.png";
import princess from "@/images/Princess Image.png";
import krang from "@/images/Krang.PNG";
import carty1 from "@/images/Carty1.PNG";
import carty2 from "@/images/Carty2.PNG";
export { capabilityLinks } from "./capability-routes";
export type { CapabilityLink } from "./capability-routes";

export type CapabilityImage = {
  src: StaticImageData;
  alt: string;
};

export type CapabilityExample = {
  title: string;
  description: string;
  label?: string;
  image?: CapabilityImage;
  images?: CapabilityImage[];
};

export type CapabilityPage = {
  slug: string;
  title: string;
  description: string;
  examples?: CapabilityExample[];
  staticVisual?: CapabilityImage;
  focusAreas?: string[];
  editorialHeading?: string;
  editorialParagraphs?: string[];
  cta?: string;
  ctaHref?: string;
  ctaSecondary?: string;
  ctaSupport?: string;
  note?: string;
};

export const capabilityPages: CapabilityPage[] = [
  {
    slug: "product-development",
    title: "Product Development",
    description:
      "At Shift Shift Co., we believe thoughtful product design is mandatory, not optional. We develop products with our clients from early concept through working prototype, bringing together software, hardware, data, interface design, and rapid iteration to turn a good idea into something useful.",
    examples: [
      {
        title: "VEHICLE TELEMETRY",
        description:
          "Custom telemetry and field-monitoring systems combining hardware, Bluetooth connectivity, and purpose-built software to surface useful information in motion.",
        label: "Selected example",
        image: {
          src: krang,
          alt: "Krang vehicle telemetry dashboard",
        },
      },
      {
        title: "NAVIGATION SYSTEM",
        description:
          "Native mobile navigation designed around specialized routing, live guidance, and the constraints of real-world movement.",
        label: "Selected example",
        images: [
          { src: carty1, alt: "Navigation route overview on a mobile map" },
          { src: carty2, alt: "Turn-by-turn mobile navigation guidance" },
        ],
      },
      {
        title: "UTILITY PRODUCT DEVELOPMENT",
        description:
          "Practical tools and accessories created to solve focused real-world problems through functional, user-centered design.",
        label: "Independent development",
      },
    ],
  },
  {
    slug: "platform-development",
    title: "Platform Development",
    description:
      "The best platforms make complicated systems feel simple. We work with our clients to bring data, workflows, intelligence, and interfaces together into useful platforms that organize complexity, connect the right pieces, and make better work possible.",
    examples: [
      {
        title: "ONE BETTER THOUGHT",
        description:
          "We developed an AI-assisted thinking tool designed to help users move beyond their first idea. Rather than simply generating answers, One Better Thought encourages people to extend, challenge, reframe, and connect their thinking, helping them explore a subject more deeply and leave with a stronger idea than the one they started with.",
        label: "Selected example",
        image: {
          src: syn1,
          alt: "One Better Thought interface screenshot",
        },
      },
      {
        title: "THE OYSTER: SOCIAL INTERACTION REVOLVER",
        description:
          "Oyster turns thought connection into a bounded lineage path built around one selected signal rather than an infinite feed. Parents, siblings, children, and grandchildren stay visible in a finite local slice, making it easier to recenter, reply, bridge, extend, save, or keep following an idea without losing the thread.",
        label: "Internal project",
        image: {
          src: syn2,
          alt: "The Oyster path interface screenshot",
        },
      },
      {
        title: "THE FIELD: TOPICAL IDEATION DISPLAY",
        description:
          "The Field explores thought as a persistent cognitive ecology rather than a static node graph. Signals accumulate across a broader topical landscape, with relationships, territory, activity, and resurfacing making it possible to see how ideas cluster, intersect, and influence one another over time without pretending the system is simpler than it is.",
        label: "Independent development",
        image: {
          src: syn3,
          alt: "The Field topical ideation display screenshot",
        },
      },
    ],
  },
  {
    slug: "site-development",
    title: "Site Development & Publishing",
    description:
      "A website should do more than exist beautifully on the internet. We create thoughtful digital experiences and publishing systems that bring together strong design, useful technology, clear information architecture, and the tools needed to keep good ideas moving.",
    examples: [
      {
        title: "THE SHIFTING TIDES OF AMERICAN MEMORY",
        description:
          "We built a bespoke publishing environment for long-form historical storytelling, with custom structures such as Artifacts and Signals that let primary-source evidence, newsroom intake, and contextual threads become part of the reading experience itself. Instead of forcing the work into a generic blog shape, the site was designed around deeper historical research, connected source material, and narrative paths that can hold more than a single finished post.",
        label: "Selected example",
        image: {
          src: tap,
          alt: "The American Piedmont screenshot",
        },
      },
      {
        title: "FINANCIAL TRENDS ANALYSIS",
        description:
          "We designed a financial-analysis environment around a simple working method: Notice. Think. Explore. Prove. The site pairs published analysis with a Radar of Signals and supporting editorial tools so the process of spotting a business move, developing the idea, testing the evidence, and presenting the trend stays visible instead of disappearing behind a finished conclusion.",
        label: "Independent development",
        image: {
          src: crackback,
          alt: "Financial Trends Analysis screenshot",
        },
      },
    ],
  },
  {
    slug: "pricing-solutions",
    title: "Pricing & Decision Solutions",
    description:
      "Good decisions rarely begin with a perfect dataset or an obvious answer. We help clients structure messy questions, connect the right data, and build practical pricing, analytical, and decision tools that turn complexity into something people can actually use.",
    examples: [
      {
        title: "INTERACTIVE: TRAVEL PRICE MONITORING",
        description:
          "We built this tool to help our client evaluate how different inventory and pricing curves changed over time, compare options across categories, and make more informed purchasing decisions based on real observed price movement.",
        label: "Selected example",
      },
      {
        title: "Pricing Analysis Tools",
        description:
          "Decision-support prototypes for comparing prices, monitoring market movement, and translating complex pricing data into actionable signals.",
        label: "Prototype",
      },
      {
        title: "Revenue & Commercial Decision Support",
        description:
          "Analytical approaches designed to support pricing, revenue management, forecasting, experimentation, and commercial decision-making.",
        label: "Independent development",
      },
    ],
    staticVisual: {
      src: princess,
      alt: "Princess cruise fare monitoring dashboard showing historical prices and decision insight",
    },
  },
  {
    slug: "research",
    title: "Research & Analysis",
    description:
      "We believe difficult questions deserve more than a quick answer. We dig into complex subjects, find and connect the evidence that matters, and turn rigorous research and analysis into clear understanding, useful conclusions, and new directions worth pursuing.",
    examples: [
      {
        title: "Reconstruction-Era Political Research",
        description:
          "Long-form historical research into political figures, institutions, economic networks, and contested narratives during Reconstruction.",
        label: "Selected example",
      },
      {
        title: "Archival Source Analysis",
        description:
          "Structured review and synthesis of newspapers, books, government records, historical documents, and other primary sources.",
        label: "Independent development",
      },
    ],
  },
  {
    slug: "consulting",
    title: "Consulting & Advisory",
    description:
      "Growing businesses often reach a point where the work is succeeding faster than the systems behind it. We help founders and teams understand how the business actually works, organize the moving pieces, and design practical operating models, processes, tools, and growth plans that make the business easier to run — and easier to grow.",
    examples: [
      {
        title: "SMALL BUSINESS OPERATING MODEL",
        description:
          "We help founder-led businesses make the work behind the business visible: programs and services, customer flow, capacity, staffing, scheduling, and revenue structure. Together we map operational constraints and test growth scenarios, turning what has largely lived in the founder’s head into a clearer model for running and growing the business.",
        label: "Advisory",
      },
      {
        title: "CUSTOMER & BUSINESS SYSTEMS",
        description:
          "We organize fragmented customer and family records, registrations, program history, source attribution, revenue, and communications into a useful operating picture. That can mean shaping a CRM, redesigning workflows, or evaluating software and platforms so information supports better customer care and more grounded management and growth decisions.",
        label: "Systems design",
      },
      {
        title: "GROWTH & FOUNDER ADVISORY",
        description:
          "We work directly with founders to compare expansion choices, new offerings, staffing, technology, and capacity through practical scenarios and clear priorities. From build-versus-buy decisions to reducing founder dependence, we help teams plan implementation and preserve the quality of their work as the business grows.",
        label: "Founder advisory",
      },
    ],
    focusAreas: [
      "Business and operating model design",
      "Programs, services, and growth planning",
      "Customer journeys and business data",
      "Process, workflow, and capacity design",
      "Revenue and customer analysis",
      "Technology and software evaluation",
      "Founder decision support",
      "Practical implementation",
    ],
    editorialHeading: "BUILT FROM EXPERIENCE. GROUNDED IN THE WORK.",
    editorialParagraphs: [
      "We start by understanding how the business works today: where work gets stuck, what customers need, and which decisions depend too heavily on one person. Then we help organize the moving pieces into a clearer way to operate and grow.",
      "The work can span management advice, customer and revenue analysis, operating processes, and technology choices. When a plan needs more than a recommendation, we can design and build the CRM, internal tool, decision system, workflow, or customer experience that puts it into practice.",
      "We work alongside founders and small teams to make the next steps useful, testable, and realistic for the business they have — and the one they want to become.",
    ],
    cta: "Let’s build something useful. →",
    ctaHref: "mailto:consulting@shiftshift.co",
    ctaSecondary: "consulting@shiftshift.co",
    ctaSupport: "Tell us what you're trying to solve.",
  },
];

export function getCapabilityPage(slug: string) {
  return capabilityPages.find((page) => page.slug === slug);
}
