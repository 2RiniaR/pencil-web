import { extractTweetId } from "./detector";

type TwitterOEmbedResponse = {
  html: string;
  author_name: string;
  author_url: string;
};

/**
 * Twitter oEmbed APIからツイートの埋め込みHTMLを取得する
 */
export async function generateTwitterEmbed(url: string): Promise<string> {
  const tweetId = extractTweetId(url);

  if (!tweetId) {
    return createFallbackLink(url);
  }

  try {
    // Twitter oEmbed API（スクリプトなしのHTML取得）
    const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&omit_script=true`;

    const response = await fetch(oembedUrl, {
      next: { revalidate: 86400 } // 24時間キャッシュ
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: TwitterOEmbedResponse = await response.json();

    // oEmbedのHTMLをラッパーで囲む
    return `<div class="embed-twitter">${data.html}</div>`;
  } catch {
    // エラー時はフォールバックリンク
    return createFallbackLink(url);
  }
}

/**
 * フォールバック用のシンプルなリンクを生成
 */
function createFallbackLink(url: string): string {
  return `<p><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a></p>`;
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
