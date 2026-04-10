'use client';

import { CodeBlock } from '@/components/code-block/code-block';
import { DemoSection } from '@/components/demo-section/demo-section';
import { IdentifyForm } from '@/components/identify-form/identify-form';
import styles from '@/components/page-layout/page-layout.module.css';
import { TrackButton } from '@/components/track-button/track-button';

export default function HomePage() {
	return (
		<div className={styles.page}>
			<div className={styles.hero}>
				<span className={`${styles.badge} ${styles.badgeNpm}`}>
					NPM Package
				</span>
				<h1 className={styles.heading}>Customer Data Platform</h1>
				<p className={styles.subheading}>
					This page demonstrates CDP integration using the{' '}
					<code>@oursprivacy/cdp-sdk</code> NPM package. Events are tracked
					using the imported SDK module — ideal for React and Next.js
					applications.
				</p>
				<div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
					<a
						href="https://www.npmjs.com/package/@oursprivacy/cdp-sdk"
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: 'var(--accent-highlight)' }}
					>
						NPM Package →
					</a>
					<a
						href="https://docs.oursprivacy.com/docs/web-sdk-javascript"
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: 'var(--accent-highlight)' }}
					>
						Web SDK Docs →
					</a>
				</div>
			</div>

			<div className={styles.grid}>
				<DemoSection
					title="Track Events"
					description="Fire a custom event using ours.track(). Click the button to send a 'button_click' event to the CDP."
				>
					<div style={{ marginBottom: '1rem' }}>
						<TrackButton />
					</div>
					<CodeBlock
						label="Code"
						code={`import ours from '@oursprivacy/cdp-sdk';

ours.track('button_click');`}
					/>
				</DemoSection>

				<DemoSection
					title="Identify Users"
					description="Associate events with a known user using ours.identify(). Enter an email or name to link the current visitor to a user profile."
				>
					<div style={{ marginBottom: '1rem' }}>
						<IdentifyForm mode="npm" />
					</div>
					<CodeBlock
						label="Code"
						code={`import ours from '@oursprivacy/cdp-sdk';

ours.identify({
  email: 'user@example.com',
  name: 'Jane Doe',
});`}
					/>
				</DemoSection>

				<DemoSection
					title="Automatic Page Views"
					description="With track_web_events enabled, page views, clicks, and route changes are captured automatically — no manual instrumentation needed."
				>
					<CodeBlock
						label="Initialization"
						code={`import ours from '@oursprivacy/cdp-sdk';

ours.init('YOUR_TOKEN', {
  track_web_events: true,
});`}
					/>
				</DemoSection>
			</div>
		</div>
	);
}
