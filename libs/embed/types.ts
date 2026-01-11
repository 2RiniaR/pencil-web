/**
 * 埋め込みURL種別
 */
export enum EmbedType {
  YouTube = "youtube",
  Twitter = "twitter",
  General = "general"
}

/**
 * OGP情報
 */
export type OgpData = {
  title: string;
  description: string;
  image: string | null;
  siteName: string | null;
  url: string;
};

/**
 * 埋め込み処理結果
 */
export type EmbedResult = {
  type: EmbedType;
  html: string;
  originalUrl: string;
};
