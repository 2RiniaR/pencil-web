import { load } from "cheerio";
import { OgpData } from "./types";

/**
 * URLからOGP情報を取得する
 */
export async function fetchOgpData(url: string): Promise<OgpData> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "bot"
      },
      next: { revalidate: 86400 } // 24時間キャッシュ
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const $ = load(html);

    return {
      title:
        $('meta[property="og:title"]').attr("content") ||
        $('meta[name="twitter:title"]').attr("content") ||
        $("title").text() ||
        url,
      description:
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="twitter:description"]').attr("content") ||
        $('meta[name="description"]').attr("content") ||
        "",
      image: $('meta[property="og:image"]').attr("content") || $('meta[name="twitter:image"]').attr("content") || null,
      siteName: $('meta[property="og:site_name"]').attr("content") || extractDomain(url),
      url
    };
  } catch {
    // エラー時はURLのみの基本情報を返す
    return {
      title: url,
      description: "",
      image: null,
      siteName: extractDomain(url),
      url
    };
  }
}

/**
 * URLからドメイン名を抽出する
 */
function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

/**
 * リンクカードのHTMLを生成する
 */
export function generateLinkCard(ogp: OgpData): string {
  const title = escapeHtml(truncate(ogp.title, 100));
  const description = escapeHtml(truncate(ogp.description, 120));
  const siteName = escapeHtml(ogp.siteName || "");
  const url = escapeHtml(ogp.url);

  const imageHtml = ogp.image
    ? `<img class="link-card-image" src="${escapeHtml(ogp.image)}" alt="" loading="lazy" />`
    : "";

  return `
<a href="${url}" class="link-card" target="_blank" rel="noopener noreferrer">
  <div class="link-card-content">
    <div class="link-card-title">${title}</div>
    ${description ? `<div class="link-card-description">${description}</div>` : ""}
    <div class="link-card-site">${siteName}</div>
  </div>
  ${imageHtml}
</a>`.trim();
}

/**
 * リンクカード埋め込みを生成する（OGP取得からHTML生成まで）
 */
export async function generateLinkCardEmbed(url: string): Promise<string> {
  const ogp = await fetchOgpData(url);
  return generateLinkCard(ogp);
}

/**
 * 文字列を指定の長さで切り詰める
 */
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - 1) + "…";
}

/**
 * HTMLエスケープ
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
