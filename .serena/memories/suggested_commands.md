# 開発コマンド一覧

## 開発環境の起動
```bash
npm run dev        # 開発サーバーを起動 (0.0.0.0でホスト、インスペクター有効)
```

## ビルド・デプロイ
```bash
npm run build      # プロダクションビルド
npm run export     # 静的エクスポート
npm run start      # プロダクションサーバー起動
```

## コード品質チェック
```bash
npm run eslint     # ESLintでコードをチェック
npm run eslint:fix # ESLintエラーを自動修正
npm run stylelint  # StylelintでCSSをチェック
npm run stylelint:fix # Stylelintエラーを自動修正
npm run format     # Prettierでコードをフォーマット
```

## Git関連 (Darwin/macOS)
```bash
git status         # 変更状況を確認
git add .          # すべての変更をステージング
git commit -m "message" # コミット
git push           # リモートにプッシュ
git pull           # リモートから取得
```

## ファイル操作 (Darwin/macOS)
```bash
ls -la            # ファイル一覧（隠しファイル含む）
cd <directory>    # ディレクトリ移動
cat <file>        # ファイル内容表示
grep -r "pattern" . # 再帰的に検索
find . -name "*.tsx" # ファイル名で検索
```

## パッケージ管理
```bash
npm install       # 依存関係をインストール
npm install <package> # パッケージを追加
npm install -D <package> # 開発依存関係として追加
```