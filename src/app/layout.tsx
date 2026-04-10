import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Nav } from '@/components/nav/nav';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Ours Privacy | Next.js Demo',
	description:
		'A demonstration environment for integrating Ours Privacy CDP and CMP with Next.js',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Nav />
				{children}
			</body>
		</html>
	);
}
