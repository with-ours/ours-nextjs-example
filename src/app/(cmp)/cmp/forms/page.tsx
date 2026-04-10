'use client';

import { DemoSection } from '@/components/demo-section/demo-section';
import styles from '@/components/page-layout/page-layout.module.css';
import { useState } from 'react';

export default function CmpFormsPage() {
	const [email, setEmail] = useState('');
	const [marketing, setMarketing] = useState(false);
	const [productUpdates, setProductUpdates] = useState(true);

	return (
		<div className={styles.page}>
			<div className={styles.hero}>
				<span className={`${styles.badge} ${styles.badgeCmp}`}>CMP Test Page</span>
				<h1 className={styles.heading}>Forms and State Updates</h1>
				<p className={styles.subheading}>
					Use this page to test controlled inputs, checkbox toggles, and live
					previews while the consent banner is shown.
				</p>
			</div>

			<div className={styles.gridTwo}>
				<DemoSection
					title="Controlled Form"
					description="Typing and toggling fields here will rerender this page component."
				>
					<div style={{ display: 'grid', gap: '1rem' }}>
						<label style={{ display: 'grid', gap: '0.5rem' }}>
							<span>Email address</span>
							<input
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								placeholder="alex@example.com"
								style={{
									padding: '0.75rem 0.875rem',
									borderRadius: '10px',
									border: '1px solid rgba(120, 199, 227, 0.2)',
									background: 'rgba(0, 23, 34, 0.55)',
									color: 'var(--text-primary)',
								}}
							/>
						</label>

						<label style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
							<input
								type="checkbox"
								checked={marketing}
								onChange={(event) => setMarketing(event.target.checked)}
							/>
							<span>Marketing updates</span>
						</label>

						<label style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
							<input
								type="checkbox"
								checked={productUpdates}
								onChange={(event) => setProductUpdates(event.target.checked)}
							/>
							<span>Product updates</span>
						</label>
					</div>
				</DemoSection>

				<DemoSection
					title="Live Preview"
					description="This panel updates on every keystroke and checkbox change."
				>
					<div style={{ display: 'grid', gap: '0.75rem', color: 'var(--text-secondary)' }}>
						<div>
							<strong style={{ color: 'var(--text-primary)' }}>Email:</strong>{' '}
							{email || 'No value yet'}
						</div>
						<div>
							<strong style={{ color: 'var(--text-primary)' }}>Marketing:</strong>{' '}
							{marketing ? 'Enabled' : 'Disabled'}
						</div>
						<div>
							<strong style={{ color: 'var(--text-primary)' }}>Product updates:</strong>{' '}
							{productUpdates ? 'Enabled' : 'Disabled'}
						</div>
					</div>
				</DemoSection>
			</div>
		</div>
	);
}
