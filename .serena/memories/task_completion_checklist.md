# タスク完了時のチェックリスト

## コード変更後に必ず実行するコマンド

### 1. Lintチェック
```bash
npm run eslint     # TypeScript/JavaScriptのエラーチェック
npm run stylelint  # CSS/SCSSのエラーチェック
```

### 2. エラーがある場合は自動修正
```bash
npm run eslint:fix    # ESLintエラーの自動修正
npm run stylelint:fix # StyleLintエラーの自動修正
npm run format        # Prettierでフォーマット
```

### 3. ビルドの確認
```bash
npm run build      # プロダクションビルドでエラーがないか確認
```

### 4. 開発サーバーでの動作確認
```bash
npm run dev        # 開発サーバーで実際の動作を確認
```

## チェック項目
- [ ] ESLintエラーがないこと
- [ ] StyleLintエラーがないこと
- [ ] TypeScriptのコンパイルエラーがないこと
- [ ] ビルドが成功すること
- [ ] 開発サーバーで正常に動作すること
- [ ] コンソールエラーがないこと
- [ ] レスポンシブデザインが維持されていること（必要に応じて）

## 注意事項
- コミット前には必ずLintチェックを実行
- 自動修正で解決できないエラーは手動で修正
- ビルドエラーが出た場合は、エラーメッセージを確認して対処