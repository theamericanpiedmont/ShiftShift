# Shift Shift Co.

Minimal Next.js website for Shift Shift Co., including the public homepage and Krang support/privacy pages.

Intended production domain: `https://shiftshift.co`

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
