import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getDetail } from "~/libs/microcms";
import { OgImage } from "~/components/OgImage";

export const runtime = "edge";
const font = fetch(new URL("./mplus-2c-medium.ttf", import.meta.url)).then((res) => res.arrayBuffer());

type Props = {
  params: {
    slug: string;
  };
};

export async function GET(request: NextRequest, { params }: Props) {
  const data = await getDetail(params.slug, { draftKey: request.nextUrl.searchParams.get("dk") ?? undefined });
  return new ImageResponse(<OgImage title={data.title} thumbnail={data.thumbnail?.url} />, {
    fonts: [
      {
        name: "m-plus-2c",
        data: await font,
        weight: 500,
        style: "normal"
      }
    ]
  });
}
