'use client';

import styles from './consent-controls.module.css';

function callConsent(method: keyof typeof actions) {
	if (window.ours_consent) {
		actions[method]();
	}
}

const actions = {
	acceptAll: () => window.ours_consent.acceptAll(),
	necessaryOnly: () => window.ours_consent.necessaryOnly(),
	show: () => window.ours_consent.show(),
	showPreferences: () => window.ours_consent.showPreferences(),
};

export function ConsentControls() {
	return (
		<div className={styles.wrapper}>
			<button type="button" onClick={() => callConsent('acceptAll')}>
				Accept All
			</button>
			<button type="button" onClick={() => callConsent('necessaryOnly')}>
				Necessary Only
			</button>
			<button type="button" onClick={() => callConsent('show')}>
				Show Banner
			</button>
			<button type="button" onClick={() => callConsent('showPreferences')}>
				Show Preferences
			</button>
		</div>
	);
}
