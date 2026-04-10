'use client';

import { CodeBlock } from '@/components/code-block/code-block';
import { DemoSection } from '@/components/demo-section/demo-section';
import { IdentifyForm } from '@/components/identify-form/identify-form';
import styles from '@/components/page-layout/page-layout.module.css';
import { TrackButtonCdn } from '@/components/track-button-cdn/track-button-cdn';

export default function CdnPage() {
	return (
		<div className={styles.page}>
			<div className={styles.hero}>
				<span className={`${styles.badge} ${styles.badgeCdn}`}>
					CDN Script Tag
				</span>
				<h1 className={styles.heading}>CDP — CDN Integration</h1>
				<p className={styles.subheading}>
					This page loads the CDP via a CDN script tag — no build tools or
					package manager required. Events are tracked using the global{' '}
					<code>window.ours(&apos;track&apos;, ...)</code> function.
				</p>
			</div>

			<div className={styles.grid}>
				<DemoSection
					title="CDN Installation"
					description="Add this script tag to your HTML <head>. The SDK creates a global ours() function that queues calls until the script loads."
				>
					<CodeBlock
						label="HTML"
						code={`<!-- Add to <head> -->
<script>
  "use strict";(function(){
    var r="https://cdn.oursprivacy.com/main.js";
    // ... loader snippet
  })();
  ours('init', 'YOUR_TOKEN', {
    track_web_events: true,
    bot_detection: true
  });
</script>`}
					/>
				</DemoSection>

				<DemoSection
					title="Track Events"
					description="Fire events using the global ours() function. Works identically to the NPM version."
				>
					<div style={{ marginBottom: '1rem' }}>
						<TrackButtonCdn />
					</div>
					<CodeBlock
						label="Code"
						code={`// Track a custom event
ours('track', 'button_click');

// Track with properties
ours('track', 'purchase', {
  value: 99.99,
  currency: 'USD'
});`}
					/>
				</DemoSection>

				<DemoSection
					title="Identify Users"
					description="Associate the current visitor with a known user profile using the CDN API."
				>
					<div style={{ marginBottom: '1rem' }}>
						<IdentifyForm mode="cdn" />
					</div>
					<CodeBlock
						label="Code"
						code={`ours('identify', {
  email: 'user@example.com',
  name: 'Jane Doe'
});`}
					/>
				</DemoSection>
			</div>
		</div>
	);
}
