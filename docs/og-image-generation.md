# OG画像静的生成システム

## 概要

記事のOG画像を、APIでの動的生成から、ビルド時の静的生成に移行しました。
差分検出により、変更があった記事のみ再生成することで、ビルド時間を短縮しています。

## 機能

- ✅ ビルド時に自動でOG画像生成
- ✅ タイトル・サムネイル変更の差分検出
- ✅ Vercel Blob Storageでキャッシュ永続化
- ✅ ローカル環境でも動作

## セットアップ

### 1. 環境変数の設定

#### 必須
- `MICROCMS_API_KEY`: microCMSのAPIキー

#### オプション（Vercel Blob Storage使用時）
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob Storageのトークン

### 2. Vercel Blob Storageの設定

1. Vercelダッシュボードでプロジェクトを選択
2. "Storage" タブから "Create Database"
3. "Blob" を選択して作成
4. 環境変数 `BLOB_READ_WRITE_TOKEN` が自動で設定される

## 使い方

### ローカル開発

```bash
# OG画像のみ生成
npm run generate:og

# ビルド（OG画像生成を含む）
npm run build
```

### Vercelデプロイ

自動的に以下の処理が実行されます：

1. Blob Storageからキャッシュ読み込み
2. 差分のある記事のOG画像を生成
3. 更新されたキャッシュをBlob Storageに保存

## 仕組み

### 差分検出

各記事のタイトルとサムネイルURLからMD5ハッシュを生成し、前回生成時と比較します。

```json
{
  "article-id": {
    "hash": "md5-hash-value",
    "generatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### ファイル構成

```
public/og/
  ├── {article-id-1}.png
  ├── {article-id-2}.png
  └── ...

.og-cache.json (ローカルキャッシュ、gitignore対象)
```

### 静的配信

OG画像は以下のURLで配信されます：
- `https://your-domain.com/og/{article-id}.png`

## トラブルシューティング

### Blob Storageが使えない場合

環境変数 `BLOB_READ_WRITE_TOKEN` が設定されていない場合、ローカルファイルシステムのみを使用します。
Vercelでは毎回全画像が再生成されます。

### キャッシュをリセットしたい場合

1. Vercel Blob Storageの場合：
   - Vercelダッシュボードから `og-cache.json` を削除

2. ローカルの場合：
   ```bash
   rm .og-cache.json
   npm run generate:og
   ```

## 技術詳細

- **画像生成**: `@vercel/og` (Next.js組み込み)
- **フォント**: M PLUS 2c Medium
- **画像サイズ**: 1200x630px
- **キャッシュ**: Vercel Blob Storage / ローカルJSON