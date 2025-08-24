import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { ImageResponse } from "next/og";
import React from "react";
import { put, head, list } from "@vercel/blob";
import { siteDomain, siteName, siteUrl } from "~/libs/const";
import { getList } from "~/libs/microcms";

type OgImageProps = {
  title: string;
  thumbnail: string | undefined;
};

const OgImage = ({ title, thumbnail }: OgImageProps) => (
  <div
    style={{
      display: "flex",
      position: "relative",
      background: "#ffffff",
      width: 1200,
      height: 630,
      color: "#404040",
      border: "solid 24px #f1d072",
      fontFamily: '"m-plus-2c"',
      fontWeight: 500,
      fontStyle: "normal"
    }}
  >
    <img
      style={{
        position: "absolute",
        width: 424,
        height: 242,
        left: 368,
        top: 70,
        border: "solid 8px #f1d072"
      }}
      src={thumbnail ?? `${siteUrl}/default_thumbnail.png`}
      alt={title}
    />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 42,
        position: "absolute",
        width: 800,
        height: 132,
        top: 330,
        left: 176
      }}
    >
      <div
        style={{
          display: "block",
          lineClamp: "2 ' ...'"
        }}
      >
        {title}
      </div>
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

type CacheEntry = {
  hash: string;
  generatedAt: string;
};

type CacheData = {
  [key: string]: CacheEntry;
};

async function loadCache(): Promise<CacheData> {
  // Vercel Blob Storageが利用可能な場合は使用
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      console.log("📥 Blob Storageからキャッシュを読み込み中...");
      
      // まずファイルが存在するかチェック
      const { blobs } = await list({ prefix: "og-cache.json" });
      if (blobs.length > 0) {
        // ファイルが存在する場合、URLから直接fetch
        const response = await fetch(blobs[0].url);
        if (response.ok) {
          const text = await response.text();
          return JSON.parse(text);
        }
      }
    } catch (error) {
      console.log("⚠️ Blob Storageからの読み込みに失敗（初回ビルドの可能性）");
    }
  }

  // ローカルファイルシステムを使用
  const cachePath = path.join(process.cwd(), ".og-cache.json");
  try {
    const data = await fs.readFile(cachePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function saveCache(cache: CacheData): Promise<void> {
  // Vercel Blob Storageが利用可能な場合は使用
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      console.log("📤 Blob Storageにキャッシュを保存中...");
      await put("og-cache.json", JSON.stringify(cache, null, 2), {
        access: "public",
        contentType: "application/json"
      });
      console.log("✅ Blob Storageへの保存完了");
    } catch (error) {
      console.error("❌ Blob Storageへの保存に失敗:", error);
    }
  }

  // ローカルファイルシステムにも保存
  const cachePath = path.join(process.cwd(), ".og-cache.json");
  await fs.writeFile(cachePath, JSON.stringify(cache, null, 2));
}

function generateHash(data: { title: string; thumbnail?: string }): string {
  const content = JSON.stringify(data);
  return crypto.createHash("md5").update(content).digest("hex");
}

async function generateOgImage(id: string, title: string, thumbnail: string | undefined): Promise<void> {
  const font = await fs.readFile(path.join(process.cwd(), "assets", "mplus-2c-medium.ttf"));

  const imageResponse = new ImageResponse(<OgImage title={title} thumbnail={thumbnail} />, {
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
  });

  const buffer = await imageResponse.arrayBuffer();
  const outputPath = path.join(process.cwd(), "public", "og", `${id}.png`);

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, Buffer.from(buffer));
}

async function main() {
  console.log("🎨 OG画像生成を開始します...");

  const cache = await loadCache();
  const newCache: CacheData = {};

  // 全件取得（ページネーション対応）
  const articles = await getList();

  let generated = 0;
  let skipped = 0;

  for (const article of articles.contents) {
    const hash = generateHash({
      title: article.title,
      thumbnail: article.thumbnail?.url
    });

    if (cache[article.id]?.hash === hash) {
      console.log(`⏭️  ${article.id}: 変更なし（スキップ）`);
      newCache[article.id] = cache[article.id];
      skipped++;
    } else {
      console.log(`🖼️  ${article.id}: 生成中...`);
      await generateOgImage(article.id, article.title, article.thumbnail?.url);

      newCache[article.id] = {
        hash,
        generatedAt: new Date().toISOString()
      };
      generated++;
    }
  }

  await saveCache(newCache);

  console.log(`✅ 完了！ 生成: ${generated}件, スキップ: ${skipped}件`);
}

main().catch((error) => {
  console.error("❌ エラーが発生しました:", error);
  process.exit(1);
});
