# Ours Integration with Next.js

Welcome to the **Ours Privacy + Next.js** integration example! This repository demonstrates how to seamlessly integrate **Ours Privacy** with a Next.js application for tracking page views, custom events, and user interactions. We can enable you to build powerful, **HIPAA-compliant analytics** solutions specifically designed for healthcare applications, ensuring your patients' data remains secure and compliant with healthcare privacy regulations.

## Installation Methods

There are **two ways** to install and initialize Ours Privacy in your Next.js application:

### Method 1: Script Tag Installation (Recommended for simple setups)

1. **Get your snippet from the Ours Privacy Admin Portal**
   - Log into your Ours dashboard
   - Navigate to the integration settings
   - Copy the provided JavaScript snippet

2. **Add the script tag to your layout**
   - Open `src/app/layout.tsx`
   - Uncomment the script tag in the `<head>` section
   - Paste your snippet from the Ours Privacy dashboard

```tsx
// src/app/layout.tsx
<head>
  <script
    dangerouslySetInnerHTML={{
      __html: `
                 // Paste your Ours Privacy initialization snippet here
        // Example:
        // window.ours = window.ours || function(){(window.ours.q=window.ours.q||[]).push(arguments)};
        // ours('init', 'YOUR_SITE_ID', {track_web_events: true});
      `
    }}
  />
</head>
```

### Method 2: NPM Package Installation (Recommended for advanced setups)

1. **Install the Ours SDK**
   ```bash
   npm install ours-web-sdk
   ```

2. **Create an Analytics Provider**
   - Use the existing `src/providers/analytics-provider.tsx` component
   - This component runs in client mode and initializes Ours Privacy on mount

```tsx
// src/providers/analytics-provider.tsx
"use client";
import { useEffect } from "react";
import ours from "ours-web-sdk";

export function AnalyticsProvider() {
  useEffect(() => {
    // This only runs on the client
    console.log("Init Ours here");
    ours.init('your_code_here', {track_web_events: true})
  }, []);

  return null; // No UI, just initialization
}
```

3. **Add the provider to your layout**
   - The provider is already included in `src/app/layout.tsx`
   - It automatically initializes Ours Privacy when the app loads

## Tracking Events

Once Ours Privacy is initialized, you can track custom events from any client component:

```tsx
// src/component/track-button.tsx
"use client"
import styles from "@/app/page.module.css";
import ours from "ours-web-sdk";

export function TrackButton() {
  return (
    <button 
      className={styles.secondary} 
      onClick={() => ours.track('button_click')}
    >
      Track me
    </button>
  );
}
```

### Key Points for Tracking:

- **Client Components Only**: All tracking calls must be made from components marked with `"use client"`
- **Import the SDK**: Import `ours` from `"ours-web-sdk"` in any component that needs to track events
- **Event Names**: Use descriptive event names like `'button_click'`, `'form_submit'`, `'page_view'`, etc.

## Configuration Options

Both installation methods support the same configuration options:

- `track_web_events`: Enable automatic tracking of page views and user interactions
- Custom event tracking with `ours.track(eventName, properties)`
- Privacy-focused data collection that respects user consent

---

## Getting Started

1. Choose your preferred installation method above
2. Replace `'your_code_here'` with your actual Ours site ID
3. Add tracking calls to your interactive components
4. Test your integration in the Ours Privacy dashboard

## Server-Side Tracking

For tracking events from server actions, API routes, or other server-side code, use the **Ours Privacy Server SDK**. This allows you to track events directly from your backend without requiring client-side JavaScript.

Visit the [Ours Privacy Track Events API documentation](https://docs.oursprivacy.com/reference/track) for complete server-side integration details, including:

- API endpoint: `POST https://api.oursprivacy.com/api/v1/track`
- Required parameters: Include at least one of `userId`, `externalId`, or `email`
- Supported languages: Node.js, Ruby, PHP, Python, and Shell examples
- Authentication and configuration options

For more detailed documentation, visit the [Ours Privacy documentation](https://docs.ours.com).
