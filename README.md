# Ours Privacy + Next.js Demo

This repo is a working reference for integrating the [Ours Privacy](https://docs.oursprivacy.com/) **CDP** (Customer Data Platform) and **CMP** (Consent Management Platform) into a Next.js application. Browse the code to see how each product is installed, initialized, and used.

## What This Repo Demonstrates

### [`/`](src/app/(cdp-npm)/page.tsx) — CDP via NPM

Shows how to install and use the CDP through the [`@oursprivacy/cdp-sdk`](https://www.npmjs.com/package/@oursprivacy/cdp-sdk) NPM package. This approach gives you a typed module import (`import ours from '@oursprivacy/cdp-sdk'`) and works well if you're already using a bundler. Track events with `ours.track()` and identify users with `ours.identify()`.

### [`/cdn`](src/app/(cdp-cdn)/cdn/page.tsx) — CDP via CDN (recommended)

Shows how to install the CDP with a single script tag — no package manager or build step required. The script creates a global `ours()` function that queues calls until the SDK loads, so you can call `ours('track', ...)` immediately without waiting for a load event. **This is the recommended approach for most sites.**

### [`/cmp`](src/app/(cmp)/cmp/page.tsx) — Consent Management Platform

Shows the current React/Next.js-friendly CMP integration. In this demo, the CMP is loaded with `next/script` using `strategy="afterInteractive"` so the banner can render without colliding with Next.js hydration. This improves reliability for SSR React apps, but it means anything that executes before CMP boot must be manually blocked in markup.

### [`/integration`](src/app/(cdp-cdn-cmp)/integration/page.tsx) — CMP + CDP Together

Shows the same React/Next.js compatibility pattern with both products on the page. Both scripts load `afterInteractive`, which avoids hydration conflicts but forfeits strict first-load blocking for anything that runs before the CMP initializes.

## Why Layout Files?

In Next.js, a [layout](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates) is a component that wraps every page in its directory. Layouts are the right place to load analytics and consent scripts because:

- **They run once** — the layout mounts when a visitor enters that section of your site. Scripts initialize once and persist across page navigations.
- **They wrap all child pages** — every page inside the layout folder automatically gets the scripts without repeating code.
- **They compose** — the root layout provides global things (nav, fonts, CSS), and nested layouts add product-specific scripts on top.

This project has four product-specific nested layouts:

### CDP via CDN — [`src/app/(cdp-cdn)/layout.tsx`](src/app/(cdp-cdn)/layout.tsx)

The recommended starting point. This layout injects the CDP loader snippet using `next/script`:

```tsx
import Script from 'next/script';

export default function Layout({ children }) {
  return (
    <>
      <Script
        id="ours-cdp"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          // Paste your snippet from the Ours Privacy dashboard here.
          // Go to app.oursprivacy.com → Settings → Install to copy it.
          __html: `...`,
        }}
      />
      {children}
    </>
  );
}
```

### CMP only — [`src/app/(cmp)/layout.tsx`](src/app/(cmp)/layout.tsx)

This layout loads just the CMP for the standalone `/cmp` route. It uses `afterInteractive` for the current Next.js/React integration pattern:

```tsx
<link rel="stylesheet" href="https://cdn.oursprivacy.com/consent.css" />
<Script
  src="https://cdn.oursprivacy.com/cmp-init?token=YOUR_CMP_TOKEN"
  strategy="afterInteractive"
/>
```

This is not equivalent to a strict early-head install. It trades away first-load automatic blocking for framework compatibility. If your page includes scripts or embeds in the initial HTML that must stay inert until consent is known, mark them up with the CMP's manual blocking attributes so they do not execute before the CMP boots.

### CDP via CDN + CMP — [`src/app/(cdp-cdn-cmp)/layout.tsx`](src/app/(cdp-cdn-cmp)/layout.tsx)

For the combined setup in this demo, both scripts are loaded `afterInteractive`:

```tsx
<link rel="stylesheet" href="https://cdn.oursprivacy.com/consent.css" />
<Script
  src="https://cdn.oursprivacy.com/cmp-init?token=YOUR_CMP_TOKEN"
  strategy="afterInteractive"
/>
<Script
  id="ours-cdp"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{ __html: `...` }}
/>
```

This keeps the UI stable in Next.js, but it means the CMP only starts automatically blocking once it has initialized on the client. Use manual blocking for any script or resource that is present in the initial page HTML and must remain blocked before that point. See the [Cookie Consent docs](https://docs.oursprivacy.com/docs/cookie-consent) for configuration options.

## React/Next.js Story

The current guidance for SSR React apps is:

- Load the CMP with `afterInteractive` to avoid hydration conflicts.
- Keep using automatic blocking for anything loaded after the CMP initializes.
- Manually block any scripts or resources that appear in the initial HTML and must not execute before consent is known.

Manual blocking usually means rendering the resource in an inert form in your HTML, for example:

```html
<script
  type="text/plain"
  data-category="analytics"
  src="https://www.google-analytics.com/analytics.js"
></script>
```

That keeps the browser from executing the script before the CMP boots. Once the CMP initializes and the user grants consent, it can enable the script.

This is the current React/Next.js integration guidance for SSR apps. If you need strict first-load blocking guarantees for everything on the page, use manual blocking for anything present in the initial HTML and ensure third-party loaders do not run before the CMP initializes.

### CDP via NPM — [`src/app/(cdp-npm)/layout.tsx`](src/app/(cdp-npm)/layout.tsx)

If you prefer a package import over a script tag, this layout wraps pages with an [`AnalyticsProvider`](src/providers/analytics-provider.tsx) component that calls `ours.init()` in a `useEffect`. You can then `import ours from '@oursprivacy/cdp-sdk'` in any client component to track events.

```bash
npm install @oursprivacy/cdp-sdk
```

See the [provider source](src/providers/analytics-provider.tsx) and the [track button source](src/components/track-button/track-button.tsx) for the full pattern.

## Docs

- [Ours Privacy Docs](https://docs.oursprivacy.com/)
- [Understanding the Event Flow](https://docs.oursprivacy.com/docs/understanding-the-event-flow)
- [Web SDK (JavaScript)](https://docs.oursprivacy.com/docs/web-sdk-javascript)
- [Cookie Consent](https://docs.oursprivacy.com/docs/cookie-consent)
- [`@oursprivacy/cdp-sdk` on NPM](https://www.npmjs.com/package/@oursprivacy/cdp-sdk)
