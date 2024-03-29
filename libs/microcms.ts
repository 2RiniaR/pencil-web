import { createClient, MicroCMSContentId, MicroCMSDate, MicroCMSImage, MicroCMSQueries } from "microcms-js-sdk";
import { notFound } from "next/navigation";

const apiKeyName = "MICROCMS_API_KEY";

const apiKey = process.env[apiKeyName];
if (typeof apiKey !== "string") {
  throw TypeError(`環境変数 ${apiKeyName} が存在しません。`);
}

export const client = createClient({
  serviceDomain: "2riniar-pencil",
  apiKey: apiKey
});

export type ArticleContent = {
  title: string;
  thumbnail?: MicroCMSImage;
  body: string;
  description: string;
  type: "blue" | "green" | "sky" | "white" | "yellow";
} & MicroCMSContentId &
  MicroCMSDate;

export async function getList(queries?: MicroCMSQueries) {
  return await client.getList<ArticleContent>({ endpoint: "pages", queries }).catch(notFound);
}

export async function getDetail(contentId: string, queries?: MicroCMSQueries) {
  return await client.getListDetail<ArticleContent>({ endpoint: "pages", contentId, queries }).catch(notFound);
}

const typeColors = {
  blue: "#aeb4d0",
  green: "#96d0c8",
  sky: "#6dd4ea",
  white: "#ffffff",
  yellow: "#ffef84"
};

export function getTypeColor(type: ArticleContent["type"]) {
  return typeColors[type];
}
