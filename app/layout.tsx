import React from "react";
import { Metadata } from "next";
import "styles/default.scss";
import Head from "next/head";
import { siteDescription, siteName, siteUrl, twitterId } from "~/libs/const";

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
  openGraph: {
    url: siteUrl,
    title: siteName,
    description: siteDescription,
    siteName: siteName,
    type: "website",
    images: {
      url: `${siteUrl}/home_thumbnail.png`,
      width: 1200,
      height: 630
    }
  },
  twitter: {
    card: "summary_large_image",
    creator: twitterId
  },
  metadataBase: new URL(siteUrl)
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => (
  <html lang="ja">
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(d) {
              var config = {
                kitId: 'srj4vnb',
                scriptTimeout: 3000,
                async: true
              },
              h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);
          `
        }}
      />
    </Head>
    <body>{children}</body>
  </html>
);

export default RootLayout;
