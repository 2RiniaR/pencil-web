# プロジェクト概要

## プロジェクト名
pencil-web

## プロジェクトの目的
Next.js 14を使用したWebアプリケーション。microCMSと連携してコンテンツを管理し、記事やページを表示するブログ/ポートフォリオサイト。

## 技術スタック
- **フレームワーク**: Next.js 14.1.1 (App Router使用)
- **言語**: TypeScript 5.3.3
- **スタイリング**: SCSS/Sass、CSS Modules、PostCSS
- **CMS**: microCMS
- **MDX**: next-mdx-remote (MDXコンテンツのレンダリング)
- **シンタックスハイライト**: highlight.js
- **パッケージマネージャー**: npm/yarn
- **ランタイム**: Node.js

## プロジェクト構造
```
pencil-web/
├── app/              # Next.js App Router ディレクトリ
│   ├── api/         # APIルート
│   ├── pages/       # ページコンポーネント
│   ├── preview/     # プレビュー機能
│   ├── layout.tsx   # ルートレイアウト
│   └── page.tsx     # ホームページ
├── components/      # 共通コンポーネント
├── libs/           # ユーティリティ、定数、microCMSクライアント
├── public/         # 静的ファイル
├── styles/         # グローバルスタイル
├── templates/      # テンプレート
└── assets/         # アセットファイル
```

## 主な依存関係
- React 18.2.0
- microCMS JS SDK
- MDX処理: next-mdx-remote, rehype-toc, rehype-slug
- 画像処理: sharp, image-size
- 日付処理: dayjs
- HTML解析: cheerio