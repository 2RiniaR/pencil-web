---
title: "【C#】動的に別アセンブリのTypeを取得する方法"
description: "ライブラリ内から、ライブラリ使用側に含まれるTypeを取得したい。現在のアプリケーションドメインに含まれているアセンブリをすべて検索することで解決した。"
type: "blue"
thumbnail: "./img/thumbnail.png"
publishedAt: "2024-05-01"
---
ライブラリを作るときに、 **ライブラリをインポートした側のType** を取得したい。あまり使わないと思うけど、用途としてはコード上の定義ファイルを設定として取得したいときとか。

# 実装

```csharp
using System;

public static Type FindTypeFromAllAssembly(string typeName)
{
    Type type = null;
    foreach (var assembly in AppDomain.CurrentDomain.GetAssemblies())
    {
        type = assembly.GetType(typeName);
        if (type != null)
        {
            break;
        }
    }

    return type;
}
```

# 解説

[アプリケーション ドメイン - .NET Framework | Microsoft Learn](https://learn.microsoft.com/ja-jp/dotnet/framework/app-domains/application-domains)

実行箇所からランタイム上での直接アクセスが許されている最大の領域は「同一アプリケーションドメイン内にあるすべてのアセンブリ」なので、その中をすべて検索すれば良さそう。