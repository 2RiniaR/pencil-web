import { getDetail, getList } from "~/libs/microcms";
import { Article } from "~/templates/Article";
import { siteName, siteUrl, twitterId } from "~/libs/const";

type Props = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  const data = await getList();
  return data.contents.map((page) => ({
    slug: page.id
  }));
};

export const generateMetadata = async ({ params }: Props) => {
  const data = await getDetail(params.slug);
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
        url: `${siteUrl}/og/${params.slug}.png`,
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
  const data = await getDetail(params.slug);
  return <Article article={data} />;
};

export default Page;
