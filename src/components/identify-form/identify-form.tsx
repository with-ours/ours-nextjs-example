'use client';

import { useState } from 'react';
import styles from './identify-form.module.css';

export function IdentifyForm({
	onIdentify,
	mode = 'npm',
}: {
	onIdentify?: () => void;
	mode?: 'npm' | 'cdn';
}) {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const props: Record<string, string> = {};
		if (email) props.email = email;
		if (name) props.name = name;
		if (Object.keys(props).length === 0) return;

		if (mode === 'npm') {
			const ours = (await import('@oursprivacy/cdp-sdk')).default;
			ours.identify(props);
		} else if (window.ours) {
			window.ours('identify', props);
		}
		onIdentify?.();
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.row}>
				<input
					className={styles.input}
					type="email"
					placeholder="Email address"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className={styles.input}
					type="text"
					placeholder="Full name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<button type="submit">Identify User</button>
		</form>
	);
}
