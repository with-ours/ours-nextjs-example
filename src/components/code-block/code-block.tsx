'use client';

import { useCallback, useState } from 'react';
import styles from './code-block.module.css';

export function CodeBlock({ code, label }: { code: string; label?: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, [code]);

	return (
		<div className={styles.wrapper}>
			{label && <span className={styles.label}>{label}</span>}
			<button
				type="button"
				className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
				onClick={handleCopy}
			>
				{copied ? 'Copied' : 'Copy'}
			</button>
			<pre className={styles.pre}>
				<code className={styles.code}>{code}</code>
			</pre>
		</div>
	);
}
