# コードスタイルと規約

## TypeScript設定
- **strictモード**: 有効
- **target**: ES2021
- **モジュール**: CommonJS
- **JSX**: preserve
- **パスエイリアス**: 
  - `~/*` → プロジェクトルート
  - `public/*` → publicディレクトリ

## ESLint規則
- React 18のため`react-in-jsx-scope`は不要
- JSXファイル拡張子: `.jsx`, `.tsx`のみ
- importの順序: 強制
- PropTypesチェック: 無効（TypeScript使用のため）
- アクセシビリティ: jsx-a11yプラグイン有効

## Prettier設定
- コードフォーマット自動化
- ESLintと統合

## StyleLint設定
- SCSS/Sassファイルのリンティング
- Prettierと統合

## ファイル命名規則
- コンポーネント: PascalCase（例: `Header.tsx`, `ArticleShare.tsx`）
- モジュールCSS: PascalCase + `.module.scss`（例: `Header.module.scss`）
- ユーティリティ: camelCase（例: `datetime.ts`, `util.ts`）

## インポート規則
- 絶対パス使用推奨（`~/`エイリアス）
- importの順序はESLintで自動整理

## コンポーネント規則
- 関数コンポーネントを使用
- TypeScriptで型定義
- CSS ModulesでスタイリングのスコープをLocal化

## Git規則
- ブランチ戦略: feature/[username]/[feature-type]/[feature-number]_[description]
- mainブランチがプライマリブランチ