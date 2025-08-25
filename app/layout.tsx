import React from "react";
import { Metadata } from "next";
import "node_modules/destyle.css/destyle.css";
import "styles/default.scss";
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
    <body>{children}</body>
  </html>
);

export default RootLayout;
