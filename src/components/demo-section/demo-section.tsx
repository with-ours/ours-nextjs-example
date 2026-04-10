import type { ReactNode } from 'react';
import styles from './demo-section.module.css';

export function DemoSection({
	title,
	description,
	children,
}: {
	title: string;
	description?: string;
	children: ReactNode;
}) {
	return (
		<section className={styles.section}>
			<div className={styles.header}>
				<h2 className={styles.title}>{title}</h2>
				{description && <p className={styles.description}>{description}</p>}
			</div>
			{children}
		</section>
	);
}
