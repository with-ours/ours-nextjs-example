'use client';

export function TrackButtonCdn({
	eventName = 'button_click',
	onTrack,
}: {
	eventName?: string;
	onTrack?: () => void;
}) {
	return (
		<button
			type="button"
			onClick={() => {
				if (typeof window !== 'undefined' && window.ours) {
					window.ours('track', eventName);
				}
				onTrack?.();
			}}
		>
			Track Event
		</button>
	);
}
