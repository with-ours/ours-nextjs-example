'use client';

import { useCallback, useEffect, useState } from 'react';
import styles from './consent-status.module.css';

export function ConsentStatus() {
	const [consent, setConsent] = useState<Record<string, boolean> | null>(null);

	const refresh = useCallback(() => {
		if (window.ours_consent) {
			setConsent({ ...window.ours_consent.getConsent() });
		}
	}, []);

	useEffect(() => {
		// Poll until ours_consent is available, then subscribe
		const interval = setInterval(() => {
			if (window.ours_consent) {
				clearInterval(interval);
				refresh();
				window.ours_consent.on('change', () => refresh());
			}
		}, 200);
		return () => clearInterval(interval);
	}, [refresh]);

	if (!consent) {
		return (
			<div className={styles.wrapper}>
				<p className={styles.loading}>Waiting for consent manager to load...</p>
			</div>
		);
	}

	const categories = Object.entries(consent);

	return (
		<div className={styles.wrapper}>
			{categories.length === 0 ? (
				<p className={styles.loading}>
					No consent categories found. Try interacting with the banner.
				</p>
			) : (
				categories.map(([name, accepted]) => (
					<div key={name} className={styles.category}>
						<span className={styles.categoryName}>{name}</span>
						<span
							className={`${styles.badge} ${accepted ? styles.accepted : styles.rejected}`}
						>
							{accepted ? 'Accepted' : 'Rejected'}
						</span>
					</div>
				))
			)}
		</div>
	);
}
