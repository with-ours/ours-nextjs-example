import { AnalyticsProvider } from '@/providers/analytics-provider';

export default function CdpNpmLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{children}
			<AnalyticsProvider />
		</>
	);
}
