import { load } from "cheerio";
import { EmbedType } from "./types";
import { detectEmbedType, isHttpUrl } from "./detector";
import { generateYouTubeEmbed } from "./youtube";
import { generateTwitterEmbed } from "./twitter";
import { generateLinkCardEmbed } from "./linkcard";

/**
 * HTML内の単独URLを検出し、埋め込みHTMLに変換する
 *
 * 単独行にURLのみが含まれる<p>タグを対象とする
 */
export async function processEmbeds(html: string): Promise<string> {
  const $ = load(html);

  // 単独URLを含む<p>タグを収集
  type EmbedTarget = { index: number; url: string };
  const embedTargets: EmbedTarget[] = [];
  const pElements = $("p").toArray();

  pElements.forEach((elem, index) => {
    const $p = $(elem);
    const text = $p.text().trim();

    // 子要素が単一の<a>タグで、テキストがURLと一致する場合
    // または、テキストが単独のURLの場合
    if (isHttpUrl(text)) {
      // <a>タグでラップされている場合のURL取得
      const $a = $p.find("a");
      const url = $a.length === 1 ? $a.attr("href") || text : text;

      if (isHttpUrl(url)) {
        embedTargets.push({ index, url });
      }
    }
  });

  // 並列でURL埋め込みを処理
  const embedPromises = embedTargets.map(async ({ index, url }) => {
    const embedHtml = await generateEmbedHtml(url);
    return { index, embedHtml };
  });

  const results = await Promise.all(embedPromises);

  // 結果を反映（逆順で処理してインデックスがずれないようにする）
  results.sort((a, b) => b.index - a.index);
  for (const { index, embedHtml } of results) {
    $(pElements[index]).replaceWith(embedHtml);
  }

  return $.html();
}

/**
 * URLの種別に応じた埋め込みHTMLを生成する
 */
async function generateEmbedHtml(url: string): Promise<string> {
  const embedType = detectEmbedType(url);

  switch (embedType) {
    case EmbedType.YouTube:
      return generateYouTubeEmbed(url);

    case EmbedType.Twitter:
      return generateTwitterEmbed(url);

    case EmbedType.General:
    default:
      return generateLinkCardEmbed(url);
  }
}

/**
 * HTMLにTwitter埋め込みが含まれているかどうかを判定する
 */
export function hasTwitterEmbed(html: string): boolean {
  return html.includes('class="twitter-tweet"') || html.includes('class="embed-twitter"');
}
