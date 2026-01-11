import { EmbedType } from "./types";

/**
 * URL種別判定用の正規表現パターン
 */
const URL_PATTERNS = {
  youtube: /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
  twitter: /^https?:\/\/(twitter\.com|x\.com)\/[^/]+\/status\/(\d+)/
} as const;

/**
 * URLの種別を判定する
 */
export function detectEmbedType(url: string): EmbedType {
  if (URL_PATTERNS.youtube.test(url)) {
    return EmbedType.YouTube;
  }
  if (URL_PATTERNS.twitter.test(url)) {
    return EmbedType.Twitter;
  }
  return EmbedType.General;
}

/**
 * YouTubeのURLから動画IDを抽出する
 */
export function extractYouTubeId(url: string): string | null {
  // youtube.com/watch?v=VIDEO_ID 形式
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) {
    return watchMatch[1];
  }

  // youtu.be/VIDEO_ID 形式
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) {
    return shortMatch[1];
  }

  return null;
}

/**
 * TwitterのURLからツイートIDを抽出する
 */
export function extractTweetId(url: string): string | null {
  const match = url.match(/\/status\/(\d+)/);
  return match ? match[1] : null;
}

/**
 * 文字列がHTTPまたはHTTPS URLかどうかを判定する
 */
export function isHttpUrl(text: string): boolean {
  return /^https?:\/\/[^\s]+$/.test(text.trim());
}
