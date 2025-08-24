import { getDetail } from "~/libs/microcms";
import { Article } from "~/templates/Article";
import { siteName, siteUrl, twitterId } from "~/libs/const";

type Props = {
  searchParams: Promise<{
    id: string;
    dk: string;
  }>;
};

export const revalidate = 0;

export const generateMetadata = async ({ searchParams }: Props) => {
  const { id, dk } = await searchParams;
  const data = await getDetail(id, { draftKey: dk });
  return {
    title: `${data.title} - ${siteName}`,
    description: data.description,
    openGraph: {
      url: siteUrl,
      title: `${data.title} - ${siteName}`,
      description: data.description,
      siteName: siteName,
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      creator: twitterId
    },
    metadataBase: new URL(siteUrl)
  };
};

const Page = async ({ searchParams }: Props) => {
  const { id, dk } = await searchParams;
  const data = await getDetail(id, { draftKey: dk });
  return <Article article={data} />;
};

export default Page;
