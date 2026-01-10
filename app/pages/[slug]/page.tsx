import { getDetail, getList } from "~/libs/microcms";
import { formatRichText, parseArticleContent } from "~/libs/microcms-client";
import { Article } from "~/templates/Article";
import { siteName, siteUrl, twitterId } from "~/libs/const";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateStaticParams = async () => {
  const data = await getList();
  return data.contents.map((page) => ({
    slug: page.id
  }));
};

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const data = await getDetail(slug);
  return {
    title: `${data.title} - ${siteName}`,
    description: data.description,
    openGraph: {
      url: siteUrl,
      title: `${data.title} - ${siteName}`,
      description: data.description,
      siteName: siteName,
      type: "article",
      images: {
        url: `${siteUrl}/og/${slug}`,
        width: 1200,
        height: 630
      }
    },
    twitter: {
      card: "summary_large_image",
      creator: twitterId
    },
    metadataBase: new URL(siteUrl)
  };
};

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const data = await getDetail(slug);

  // サーバーサイドでHTMLをパース
  const formattedBody = formatRichText(data.body);
  const parsedBody = parseArticleContent(formattedBody);

  return <Article article={data} parsedBody={parsedBody} />;
};

export default Page;
