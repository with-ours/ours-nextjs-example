'use client';

import { useCallback, useState } from 'react';
import styles from './event-log.module.css';

type LogEntry = {
	id: number;
	timestamp: string;
	name: string;
	props?: string;
};

let nextId = 0;

export function useEventLog() {
	const [entries, setEntries] = useState<LogEntry[]>([]);

	const logEvent = useCallback(
		(name: string, props?: Record<string, unknown>) => {
			const entry: LogEntry = {
				id: nextId++,
				timestamp: new Date().toLocaleTimeString(),
				name,
				props: props ? JSON.stringify(props) : undefined,
			};
			setEntries((prev) => [entry, ...prev]);
		},
		[],
	);

	const clear = useCallback(() => setEntries([]), []);

	return { entries, logEvent, clear };
}

export function EventLog({
	entries,
	onClear,
}: {
	entries: LogEntry[];
	onClear: () => void;
}) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<span className={styles.title}>Event Log</span>
				<button type="button" className={styles.clearButton} onClick={onClear}>
					Clear
				</button>
			</div>
			<div className={styles.list}>
				{entries.length === 0 ? (
					<p className={styles.empty}>
						No events yet. Try clicking a button above.
					</p>
				) : (
					entries.map((entry) => (
						<div key={entry.id} className={styles.entry}>
							<span className={styles.timestamp}>{entry.timestamp}</span>
							<span className={styles.eventName}>{entry.name}</span>
							{entry.props && (
								<span className={styles.eventProps}>{entry.props}</span>
							)}
						</div>
					))
				)}
			</div>
		</div>
	);
}
