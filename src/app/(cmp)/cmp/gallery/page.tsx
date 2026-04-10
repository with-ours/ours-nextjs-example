'use client';

import Image from 'next/image';
import { DemoSection } from '@/components/demo-section/demo-section';
import styles from '@/components/page-layout/page-layout.module.css';
import { useState } from 'react';

const cards = [
	{
		id: 'full',
		title: 'Full Logo',
		src: '/ours-logo-full-white.svg',
		width: 164,
		height: 26,
	},
	{
		id: 'mark',
		title: 'Logo Mark',
		src: '/ours-logo-mark.svg',
		width: 48,
		height: 48,
	},
	{
		id: 'mark-white',
		title: 'Mark on White Variant',
		src: '/ours-logo-mark-white.svg',
		width: 48,
		height: 48,
	},
];

export default function CmpGalleryPage() {
	const [selectedCard, setSelectedCard] = useState(cards[0].id);
	const [reverseOrder, setReverseOrder] = useState(false);

	const orderedCards = reverseOrder ? [...cards].reverse() : cards;
	const activeCard =
		orderedCards.find((card) => card.id === selectedCard) ?? orderedCards[0];

	return (
		<div className={styles.page}>
			<div className={styles.hero}>
				<span className={`${styles.badge} ${styles.badgeCmp}`}>CMP Test Page</span>
				<h1 className={styles.heading}>Gallery and Visual Updates</h1>
				<p className={styles.subheading}>
					Flip list order, switch cards, and trigger image updates while the
					consent UI is visible.
				</p>
			</div>

			<div className={styles.gridTwo}>
				<DemoSection
					title="Card Controls"
					description="These controls reorder the list and switch the active preview."
				>
					<div style={{ display: 'grid', gap: '0.75rem' }}>
						<div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
							<button type="button" onClick={() => setReverseOrder((value) => !value)}>
								{reverseOrder ? 'Restore order' : 'Reverse order'}
							</button>
							{orderedCards.map((card) => (
								<button
									key={card.id}
									type="button"
									onClick={() => setSelectedCard(card.id)}
									style={{
										background:
											selectedCard === card.id
												? 'var(--accent-secondary)'
												: 'transparent',
										border:
											selectedCard === card.id
												? 'none'
												: '1px solid var(--accent-primary)',
										color:
											selectedCard === card.id ? '#fff' : 'var(--accent-highlight)',
									}}
								>
									{card.title}
								</button>
							))}
						</div>

						<div style={{ display: 'grid', gap: '0.5rem', color: 'var(--text-secondary)' }}>
							{orderedCards.map((card) => (
								<div key={card.id}>
									{card.id === selectedCard ? '●' : '○'} {card.title}
								</div>
							))}
						</div>
					</div>
				</DemoSection>

				<DemoSection
					title="Active Preview"
					description="This preview swaps images and text without leaving the page."
				>
					<div
						style={{
							minHeight: '220px',
							display: 'grid',
							placeItems: 'center',
							background: 'rgba(0, 23, 34, 0.45)',
							borderRadius: '12px',
							border: '1px solid rgba(120, 199, 227, 0.15)',
							gap: '1rem',
							padding: '1.5rem',
						}}
					>
						<Image
							src={activeCard.src}
							alt={activeCard.title}
							width={activeCard.width}
							height={activeCard.height}
						/>
						<div style={{ color: 'var(--text-secondary)' }}>{activeCard.title}</div>
					</div>
				</DemoSection>
			</div>
		</div>
	);
}
