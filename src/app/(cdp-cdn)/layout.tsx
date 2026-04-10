import Script from 'next/script';

export default function CdpCdnLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Script
				id="ours-cdp-cdn"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `"use strict";(function(){var r="https://cdn.oursprivacy.com/main.js";function e(){var o;var _n=function n(){for(var _len=arguments.length,s=new Array(_len),_key=0;_key<_len;_key++){s[_key]=arguments[_key]}_n.queue.push(s)};_n.queue=((o=window.ours)==null?void 0:o.queue)||[],_n.version="1.0",window.ours=_n,window.ours_data=window.ours_data||{},window.oursLayer=window.oursLayer||[]}function t(n){if(!window.ours){e();var o=document.createElement("script");o.async=!0,o.src=n;var s=document.getElementsByTagName("script")[0];s&&s.parentNode&&s.parentNode.insertBefore(o,s)}}t(r)})();
ours('init', 'tnbg4s9br6uehvzakvsndirv', {"track_web_events":true,"bot_detection":true});`,
				}}
			/>
			{children}
		</>
	);
}
