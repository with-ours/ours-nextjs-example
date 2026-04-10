'use client';

import { CodeBlock } from '@/components/code-block/code-block';
import { DemoSection } from '@/components/demo-section/demo-section';
import styles from '@/components/page-layout/page-layout.module.css';

export default function ConsentPage() {
	return (
		<div className={styles.page}>
			<div className={styles.hero}>
				<span className={`${styles.badge} ${styles.badgeCmp}`}>
					Consent Management
				</span>
				<h1 className={styles.heading}>Consent Management Platform</h1>
				<p className={styles.subheading}>
					This page demonstrates the CMP on its own. It provides HIPAA-ready
					consent collection with auditor-grade receipts, regional policies, and
					a pre-styled banner loaded directly from the Ours Privacy CDN.
				</p>
			</div>

			<div className={styles.grid}>
				<DemoSection
					title="Installation"
					description="Add the CMP with a single script tag. The optional CSS file provides a pre-styled consent banner."
				>
					<CodeBlock
						label="HTML"
						code={`<!-- Optional: Pre-styled banner CSS -->
<link rel="stylesheet"
  href="https://cdn.oursprivacy.com/consent.css">

<!-- Required: Installation script -->
<script src="https://cdn.oursprivacy.com/cmp-init?token=YOUR_TOKEN">
</script>`}
					/>
				</DemoSection>

				<DemoSection
					title="Try It"
					description="Click the button below to show the consent banner on this page, then use the playground controls above to navigate and rerender."
				>
					<button type="button" onClick={() => window.ours_consent?.show()}>
						Show Banner
					</button>
				</DemoSection>

				<DemoSection
					title="Documentation"
					description="For the full SDK reference, regional policies, and configuration options, see the docs."
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '0.75rem',
						}}
					>
						<a
							href="https://docs.oursprivacy.com/docs/cookie-consent"
							target="_blank"
							rel="noopener noreferrer"
							style={{ color: 'var(--accent-highlight)' }}
						>
							Cookie Consent Docs →
						</a>
						<a
							href="https://docs.oursprivacy.com/docs/cookie-consent/javascript-sdk"
							target="_blank"
							rel="noopener noreferrer"
							style={{ color: 'var(--accent-highlight)' }}
						>
							JavaScript SDK Reference →
						</a>
					</div>
				</DemoSection>
			</div>
		</div>
	);
}
