'use client';

import { CodeBlock } from '@/components/code-block/code-block';
import { DemoSection } from '@/components/demo-section/demo-section';
import styles from '@/components/page-layout/page-layout.module.css';
import { TrackButtonCdn } from '@/components/track-button-cdn/track-button-cdn';

export default function IntegrationPage() {
	return (
		<div className={styles.page}>
			<div className={styles.hero}>
				<span className={`${styles.badge} ${styles.badgeIntegration}`}>
					CMP + CDP
				</span>
				<h1 className={styles.heading}>Consent-Gated Tracking</h1>
				<p className={styles.subheading}>
					See how the CMP and CDP work together. The CMP automatically gates
					tracking based on user consent — when analytics consent is rejected,
					CDP events are blocked at the network level.
				</p>
			</div>

			<div className={styles.grid}>
				<DemoSection
					title="Try It"
					description="Use the banner to change consent, then try tracking an event."
				>
					<div style={{ display: 'flex', gap: '0.75rem' }}>
						<button type="button" onClick={() => window.ours_consent?.show()}>
							Show Banner
						</button>
						<TrackButtonCdn />
					</div>
				</DemoSection>

				<DemoSection
					title="How It Works"
					description="Load the CMP first so consent is available before the CDP initializes. Once both are present, the CMP automatically gates CDP requests."
				>
					<CodeBlock
						label="Integration"
						code={`<!-- 1. Load the CMP first -->
<link rel="stylesheet"
  href="https://cdn.oursprivacy.com/consent.css">
<script src="https://cdn.oursprivacy.com/cmp-init?token=YOUR_CMP_TOKEN">
</script>

<!-- 2. Then load the CDP -->
<script>
  // CDP init snippet...
  ours('init', 'YOUR_CDP_TOKEN', {
    track_web_events: true
  });
</script>

<!-- The CMP is available before CDP init runs,
     so consent can gate tracking from the start. -->`}
					/>
				</DemoSection>
			</div>
		</div>
	);
}
