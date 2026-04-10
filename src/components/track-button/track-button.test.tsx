import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TrackButton } from './track-button';

vi.mock('@oursprivacy/cdp-sdk', () => ({
	default: {
		track: vi.fn(),
	},
}));

describe('TrackButton', () => {
	it('renders the button with correct text', () => {
		render(<TrackButton />);
		expect(
			screen.getByRole('button', { name: /track event/i }),
		).toBeInTheDocument();
	});

	it('calls ours.track when clicked', async () => {
		const user = userEvent.setup();
		const ours = await import('@oursprivacy/cdp-sdk');

		render(<TrackButton />);
		const button = screen.getByRole('button', {
			name: /track event/i,
		});

		await user.click(button);

		expect(ours.default.track).toHaveBeenCalledWith('button_click');
	});

	it('calls onTrack callback when clicked', async () => {
		const user = userEvent.setup();
		const onTrack = vi.fn();

		render(<TrackButton onTrack={onTrack} />);
		const button = screen.getByRole('button', {
			name: /track event/i,
		});

		await user.click(button);

		expect(onTrack).toHaveBeenCalled();
	});
});
