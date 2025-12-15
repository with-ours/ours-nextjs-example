'use client';
import ours from 'ours-web-sdk';
import styles from '@/app/page.module.css';

export function TrackButton() {
	return (
		<button
			type="button"
			className={styles.secondary}
			onClick={() => ours.track('button_click')}
		>
			Track me
		</button>
	);
}
