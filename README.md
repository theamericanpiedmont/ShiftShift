# Shift Shift Co.

Minimal Next.js website for Shift Shift Co., including the public homepage and Krang support/privacy pages.

Intended production domain: `https://shiftshift.co`

## Project context

ShiftShift.co is a capability-driven studio site for Shift Shift Co. It is intentionally restrained, editorial, and structured to emphasize what the company can do before it overstates who it has done it for.

The current architecture is strategically centered on six capability areas:

- product development
- platform development
- site development and publishing
- pricing and decision solutions
- research and analysis
- consulting and advisory

The site is not intended to function as a personal portfolio, a generic consulting site, an AI agency, or a loose collection of unrelated projects. Its purpose is to present a coherent point of view about how Shift Shift Co. works:

- capability over hype
- useful over flashy
- evidence over claims
- thoughtful design
- practical execution
- ambiguity turned into something usable
- technology as a means rather than an identity
- AI as leverage, not as agency positioning

The homepage should remain restrained and capability-first unless a future deliberate redesign changes that direction.

## Evolution of ShiftShift.co

ShiftShift.co should earn credibility progressively rather than manufacture it prematurely. The site should become more ambitious as the evidence justifies it, with additional proof accumulating around the existing architecture rather than requiring the site to be rebuilt from scratch.

### Stage 1: Show the work

The immediate goal is to professionally surface the body of work Shift Shift Co. has created over roughly the past year. The site should begin moving beyond purely abstract capability descriptions and show concrete evidence of the work behind those capabilities.

Initially, this can be accomplished primarily through:

- strong screenshots
- concise project narratives
- descriptions of the problem or opportunity
- what was designed or built
- the thinking behind it
- what value or usefulness resulted
- clear mapping back to Shift Shift Co.'s capabilities

Potential work includes products, platforms, publishing systems, research, pricing and decision tools, and other relevant projects.

An important distinction must be preserved. Self-directed or internal work should never be presented as though it were commissioned client work. Where work was created for a client, the client value should be described accurately. Where work was created internally or independently, it should be presented as proof of capability rather than as an invented engagement.

The purpose of Stage 1 is simple: show that we have done the work. Screenshots will carry much of the visual proof during this stage. The presentation should remain professional, editorial, restrained, and capability-driven rather than becoming a cluttered portfolio grid.

### Stage 2: Let people experience the work

The second stage introduces interactive proof. Instead of only showing visitors what Shift Shift Co. has built, the site should allow them to experience selected work directly through ShiftShift.co.

Examples include:

- Synamyn: create an appropriate interactive experience that lets a visitor engage with the underlying concept and create a "One Better Thought," rather than only viewing screenshots
- Krang: add a custom, polished product video or demonstration showing how the product works and what makes it useful
- Hooty: add a custom, polished product video or demonstration
- other projects: where technically and strategically appropriate, introduce small live demonstrations, interactive tools, simulations, or embedded experiences

The site itself should increasingly become evidence of Shift Shift Co.'s ability to create products, interfaces, platforms, and useful systems.

The purpose of Stage 2 is: don't just show the work. Let people experience it.

This does not mean every project should become interactive. Interactivity should only be introduced where it meaningfully strengthens proof of capability.

### Stage 3: Prove the work travels

Once Shift Shift Co. has completed successful new external client engagements, the site can introduce stronger third-party validation.

Potential additions include:

- client testimonials
- named client case studies where permission exists
- measurable outcomes
- before-and-after narratives
- deeper project stories
- client logos only when they represent real work and permission exists

Nothing in this stage should be fabricated. That includes testimonials, clients, metrics, outcomes, endorsements, and case studies. This stage should happen only when real client work supports it.

The purpose of Stage 3 is: show that other people trust us to do the work for them.

At that point, the site should have three complementary forms of credibility:

1. Evidence: we have built substantial work.
2. Experience: visitors can see or interact with what we build.
3. Validation: clients can attest that the work created value.

This is the point at which ShiftShift.co can evolve from an emerging studio presence into a mature business-development platform.

The long-term visitor journey should progress from:

1. "These people seem capable."
2. "These people have built impressive things."
3. "I can actually experience what they've built."
4. "Other organizations trust them to solve hard problems."
5. "I want to work with them."

Avoid prematurely adding:

- fake testimonials
- fake client logos
- invented metrics
- generic agency case studies
- unnecessary interactive gimmicks
- excessive marketing copy

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Install dependencies

```bash
npm install
```

## Start the development server

```bash
npm run dev
```

## Build for production

```bash
npm run build
```

## Run lint

```bash
npm run lint
```

## Run typecheck

```bash
npm run typecheck
```

## Project structure

```text
app/
  krang/
    privacy/
    support/
  globals.css
  layout.tsx
  page.tsx
components/
  content-section.tsx
  page-shell.tsx
  site-footer.tsx
```

## Routes

- `/`
- `/krang/support`
- `/krang/privacy`
