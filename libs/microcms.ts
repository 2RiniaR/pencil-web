import { createClient, MicroCMSContentId, MicroCMSDate, MicroCMSImage, MicroCMSQueries } from "microcms-js-sdk";
import { notFound } from "next/navigation";
import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

const apiKeyName = "MICROCMS_API_KEY";

const apiKey = process.env[apiKeyName];
if (typeof apiKey !== "string") {
  throw TypeError(`環境変数 ${apiKeyName} が存在しません。`);
}

export const client = createClient({
  serviceDomain: "2riniar-pencil",
  apiKey: apiKey
});

export const formatRichText = (richText: string) => {
  const $ = cheerio.load(richText);
  const highlight = (text: string, lang?: string) => {
    if (!lang) return hljs.highlightAuto(text);
    try {
      return hljs.highlight(text, { language: lang?.replace(/^language-/, "") || "" });
    } catch (e) {
      return hljs.highlightAuto(text);
    }
  };
  $("pre code").each((_, elm) => {
    const lang = $(elm).attr("class");
    const res = highlight($(elm).text(), lang);
    $(elm).html(res.value);
  });
  return $.html();
};

export type ArticleContent = {
  title: string;
  thumbnail?: MicroCMSImage;
  body: string;
} & MicroCMSContentId &
  MicroCMSDate;

export async function getList(queries?: MicroCMSQueries) {
  return await client.getList<ArticleContent>({ endpoint: "pages", queries }).catch(notFound);
}

export async function getDetail(contentId: string, queries?: MicroCMSQueries) {
  return await client.getListDetail<ArticleContent>({ endpoint: "pages", contentId, queries }).catch(notFound);
}
