import fs from "fs/promises";
import path from "path";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { siteDomain, siteName, siteUrl } from "~/libs/const";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const font = await fs.readFile(path.join(process.cwd(), "assets", "mplus-2c-medium.ttf"));
  return new ImageResponse(
    <OgImage title={searchParams.get("title") ?? ""} thumbnail={searchParams.get("thumbnail") ?? undefined} />,
    {
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
    }
  );
}

type OgImageProps = {
  title: string;
  thumbnail: string | undefined;
};

const OgImage = ({ title, thumbnail }: OgImageProps) => (
  <div
    style={{
      display: "flex",
      position: "relative",
      background: "linear-gradient(to bottom, #8791a3 0%, #6c717a 100%)",
      width: 1200,
      height: 630,
      color: "#dddddd",
      border: "solid 24px rgba(221, 221, 221, 0.7)",
      fontFamily: '"m-plus-2c"',
      fontWeight: 500,
      fontStyle: "normal"
    }}
  >
    <img
      style={{
        position: "absolute",
        width: 416,
        height: 234,
        left: 368,
        top: 70,
        border: "solid 4px rgba(221, 221, 221, 0.7)",
        borderRadius: 4
      }}
      src={thumbnail ?? `${siteUrl}/default_thumbnail.png`}
      alt={title}
    />
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 42,
        position: "absolute",
        width: 800,
        height: 100,
        top: 330,
        left: 176
      }}
    >
      <p
        style={{
          margin: 0,
          textAlign: "center"
        }}
      >
        {title}
      </p>
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
