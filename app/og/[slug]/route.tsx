import fs from "fs/promises";
import path from "path";
import { ImageResponse } from "next/og";
import { getDetail } from "~/libs/microcms";
import { siteDomain, siteName, siteUrl } from "~/libs/const";

export const runtime = "nodejs";

type OgImageProps = {
  title: string;
  thumbnail: string | undefined;
};

const OgImage = ({ title, thumbnail }: OgImageProps) => (
  <div
    style={{
      display: "flex",
      position: "relative",
      background: "#ffffff",
      width: 1200,
      height: 630,
      color: "#404040",
      border: "solid 24px #f1d072",
      fontFamily: '"m-plus-2c"',
      fontWeight: 500,
      fontStyle: "normal"
    }}
  >
    <img
      style={{
        position: "absolute",
        width: 424,
        height: 242,
        left: 368,
        top: 70,
        border: "solid 8px #f1d072"
      }}
      src={thumbnail ?? `${siteUrl}/default_thumbnail.png`}
      alt={title}
    />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 42,
        position: "absolute",
        width: 800,
        height: 132,
        top: 330,
        left: 176
      }}
    >
      <div
        style={{
          display: "block",
          lineClamp: "2 ' ...'"
        }}
      >
        {title}
      </div>
    </div>
    <img
      style={{
        position: "absolute",
        borderRadius: 1000,
        width: 160,
        height: 160,
        left: -32,
        bottom: -32
      }}
      src={`${siteUrl}/icon.jpg`}
      alt="アイコン"
    />
    <div
      style={{
        fontSize: 32,
        position: "absolute",
        width: 400,
        left: 148,
        bottom: 16
      }}
    >
      {siteName}
    </div>
    <div
      style={{
        fontSize: 32,
        position: "absolute",
        right: 16,
        bottom: 16,
        textAlign: "right"
      }}
    >
      {siteDomain}
    </div>
  </div>
);

export async function GET(_request: globalThis.Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getDetail(slug);

  const font = await fs.readFile(path.join(process.cwd(), "assets", "mplus-2c-medium.ttf"));

  return new ImageResponse(<OgImage title={data.title} thumbnail={data.thumbnail?.url} />, {
    fonts: [
      {
        name: "m-plus-2c",
        data: font,
        weight: 500,
        style: "normal"
      }
    ],
    width: 1200,
    height: 630
  });
}
