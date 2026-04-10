import Script from 'next/script';
import { CmpPlayground } from '@/components/cmp-playground/cmp-playground';

export default function CmpLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<link rel="stylesheet" href="https://cdn.oursprivacy.com/consent.css" />
			<Script
				id="ours-cmp"
				src="https://cdn.oursprivacy.com/cmp-init?token=gwdbv9jni5elz9k20g1ilpx3"
				strategy="afterInteractive"
			/>
			<CmpPlayground>{children}</CmpPlayground>
		</>
	);
}
