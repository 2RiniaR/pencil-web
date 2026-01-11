---
title: "stylelintがGitHub Actionsでだけ \"Error [ERR_REQUIRE_ESM]: require() of ES Module ...\" となる問題"
description: "GitHub Actionsからstylelintを使用したところ、\"Error [ERR_REQUIRE_ESM]: require() of ES Module ...\" のエラーが発生したので、対象パッケージのresolutionをpackage.jsonから変更することで解決した。"
type: "blue"
thumbnail: "./img/thumbnail.png"
publishedAt: "2024-03-01"
---
GitHub Actionsからstylelintを使用したところ、"Error \[ERR\_REQUIRE\_ESM\]: require() of ES Module ..." のエラーが発生したので、対象パッケージのresolutionをpackage.jsonから変更することで解決した。

# 起きたこと

GitHub Actionsで以下のworkflowを実行したところ、以下のエラーが発生。

```yaml:ci.yml
jobs:
  lint:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        lint:
          - eslint
          - stylelint
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - id: yarn-cache
        run: echo "::set-output name=dir::$(yarn cache dir)"
      - uses: actions/cache@v3
        with:
          path: ${{ steps.yarn-cache.outputs.dir }}
          key: ${{ runner.os }}-${{ hashFiles('**/yarn.lock') }}
          restore-keys: ${{ runner.os }}-
      - run: yarn install --frozen-lockfile
      - name: Run ${{ matrix.lint }}
        run: yarn ${{ matrix.lint }}
```

```
Error [ERR_REQUIRE_ESM]: require() of ES Module /home/runner/work/pencil-web/pencil-web/node_modules/string-width/index.js from /home/runner/work/pencil-web/pencil-web/node_modules/table/dist/src/alignString.js not supported.
Instead change the require of index.js in /home/runner/work/pencil-web/pencil-web/node_modules/table/dist/src/alignString.js to a dynamic import() which is available in all CommonJS modules.
    at Object.<anonymous> (/home/runner/work/pencil-web/pencil-web/node_modules/table/dist/src/alignString.js:7:40)
    at Object.<anonymous> (/home/runner/work/pencil-web/pencil-web/node_modules/table/dist/src/alignTableData.js:4:23)
    at Object.<anonymous> (/home/runner/work/pencil-web/pencil-web/node_modules/table/dist/src/createStream.js:4:26)
    at Object.<anonymous> (/home/runner/work/pencil-web/pencil-web/node_modules/table/dist/src/index.js:14:24)
    at async standalone (file:///home/runner/work/pencil-web/pencil-web/node_modules/stylelint/lib/standalone.mjs:87:23)
/home/runner/work/pencil-web/pencil-web/node_modules/table/dist/src/alignString.js:7
const string_width_1 = __importDefault(require("string-width"));
```

ローカル環境では起きていない。謎。

# 解決

[node.js - Error: require() of ES Module when trying to run a node container - Stack Overflow](https://stackoverflow.com/questions/77186044/error-require-of-es-module-when-trying-to-run-a-node-container)

string-widthというパッケージで発生していたので、解決先のバージョンを変えることでエラーが起きなくなった。

```json:package.json
"resolutions": {
    "string-width": "4.2.3"
}
```

yarnのcacheに関する不具合みたいな情報も出てきたけど、cacheクリアしても変わらなかった。ひとまず動いたから良かったけど、ローカルのnode環境では起きてなかったので何か設定違うのかな。