import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TrackButton } from './track-button';

// Mock the ours-web-sdk
vi.mock('ours-web-sdk', () => ({
	default: {
		track: vi.fn(),
	},
}));

describe('TrackButton', () => {
	it('renders the button with correct text', () => {
		render(<TrackButton />);
		expect(
			screen.getByRole('button', { name: /track me/i }),
		).toBeInTheDocument();
	});

	it('calls ours.track when clicked', async () => {
		const user = userEvent.setup();
		const ours = await import('ours-web-sdk');

		render(<TrackButton />);
		const button = screen.getByRole('button', { name: /track me/i });

		await user.click(button);

		expect(ours.default.track).toHaveBeenCalledWith('button_click');
	});
});
