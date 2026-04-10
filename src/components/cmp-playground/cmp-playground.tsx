'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useState } from 'react';
import styles from './cmp-playground.module.css';

const links = [
	{ href: '/cmp', label: 'Overview' },
	{ href: '/cmp/forms', label: 'Forms' },
	{ href: '/cmp/gallery', label: 'Gallery' },
];

export function CmpPlayground({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const [count, setCount] = useState(0);
	const [showDetails, setShowDetails] = useState(false);
	const [note, setNote] = useState('');

	return (
		<div className={styles.shell}>
			<section className={styles.panel}>
				<div className={styles.header}>
					<div>
						<div className={styles.title}>CMP Playground</div>
						<p className={styles.subtitle}>
							Persistent layout controls for testing route changes and rerenders
							while the CMP is active.
						</p>
					</div>
					<div className={styles.statusRow}>
						<span className={styles.pill}>Route: {pathname}</span>
						<span className={styles.pill}>Layout counter: {count}</span>
					</div>
				</div>

				<nav className={styles.nav}>
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={`${styles.link} ${pathname === link.href ? styles.linkActive : ''}`}
						>
							{link.label}
						</Link>
					))}
				</nav>

				<div className={styles.controls}>
					<div className={styles.card}>
						<div className={styles.cardTitle}>Banner Controls</div>
						<div className={styles.buttonRow}>
							<button type="button" onClick={() => window.ours_consent?.show()}>
								Show banner
							</button>
							<button
								type="button"
								className={styles.buttonSecondary}
								onClick={() => window.ours_consent?.showPreferences()}
							>
								Show preferences
							</button>
							<button
								type="button"
								className={styles.buttonDanger}
								onClick={() => window.ours_consent?.hide()}
							>
								Hide banner
							</button>
						</div>
						<p className={styles.details}>
							Use these controls after route changes to see whether the CMP stays
							stable or disappears.
						</p>
					</div>

					<div className={styles.card}>
						<div className={styles.cardTitle}>Layout Interactions</div>
						<div className={styles.buttonRow}>
							<button type="button" onClick={() => setCount((value) => value + 1)}>
								Increment counter
							</button>
							<button
								type="button"
								className={styles.buttonSecondary}
								onClick={() => setShowDetails((value) => !value)}
							>
								Toggle details
							</button>
						</div>
						<div className={styles.counter}>{count}</div>
						{showDetails ? (
							<p className={styles.details}>
								This state lives in the `/cmp` layout. It should persist as you
								navigate between the CMP test pages.
							</p>
						) : null}
					</div>

					<div className={styles.card}>
						<div className={styles.cardTitle}>Controlled Input</div>
						<div className={styles.field}>
							<label className={styles.label} htmlFor="cmp-layout-note">
								Interaction note
							</label>
							<input
								id="cmp-layout-note"
								className={styles.input}
								value={note}
								onChange={(event) => setNote(event.target.value)}
								placeholder="Type while the banner is open"
							/>
						</div>
						<p className={styles.details}>
							{note ? `Live value: ${note}` : 'Typing here forces client updates in the layout.'}
						</p>
					</div>
				</div>
			</section>

			<div className={styles.children}>{children}</div>
		</div>
	);
}
