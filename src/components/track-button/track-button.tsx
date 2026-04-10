'use client';
import ours from '@oursprivacy/cdp-sdk';

export function TrackButton({ onTrack }: { onTrack?: () => void }) {
	return (
		<button
			type="button"
			onClick={() => {
				ours.track('button_click');
				onTrack?.();
			}}
		>
			Track Event
		</button>
	);
}
