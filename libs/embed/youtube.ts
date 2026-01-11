import { extractYouTubeId } from "./detector";

/**
 * YouTube埋め込みiframeのHTMLを生成する
 */
export function generateYouTubeEmbed(url: string): string {
  const videoId = extractYouTubeId(url);

  if (!videoId) {
    return createFallbackLink(url);
  }

  return `
<div class="embed-youtube">
  <iframe
    src="https://www.youtube.com/embed/${videoId}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>`.trim();
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
