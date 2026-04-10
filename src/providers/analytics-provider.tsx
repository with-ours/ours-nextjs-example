'use client';
import ours from '@oursprivacy/cdp-sdk';
import { useEffect } from 'react';

export function AnalyticsProvider() {
	useEffect(() => {
		ours.init('tnbg4s9br6uehvzakvsndirv', {
			track_web_events: true,
		});
	}, []);

	return null;
}
