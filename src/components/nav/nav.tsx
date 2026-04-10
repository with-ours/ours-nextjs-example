'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './nav.module.css';

const links = [
	{ href: '/', label: 'CDP (NPM)' },
	{ href: '/cdn', label: 'CDP (CDN)' },
	{ href: '/cmp', label: 'CMP' },
	{ href: '/integration', label: 'Integration' },
];

export function Nav() {
	const pathname = usePathname();

	return (
		<nav className={styles.nav}>
			<Link href="/" className={styles.logo}>
				<Image
					src="/ours-logo-full-white.svg"
					alt="Ours Privacy"
					width={164}
					height={26}
					priority
				/>
			</Link>
			<div className={styles.links}>
				{links.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
					>
						{link.label}
					</Link>
				))}
			</div>
		</nav>
	);
}
