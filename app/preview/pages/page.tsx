import { getDetail } from "~/libs/microcms";
import { Article } from "~/templates/Article";
import { siteName, siteUrl, twitterId } from "~/libs/const";

type Props = {
  searchParams: {
    id: string;
    dk: string;
  };
};

export const generateMetadata = async ({ searchParams }: Props) => {
  const data = await getDetail(searchParams.id, { draftKey: searchParams.dk });
  return {
    title: `${data.title} - ${siteName}`,
    openGraph: {
      url: siteUrl,
      title: `${data.title} - ${siteName}`,
      siteName: siteName,
      type: "article",
      images: {
        url: `${siteUrl}/api/og?title=${data.title}${data.thumbnail?.url !== undefined ? `&thumbnail=${data.thumbnail.url}` : ""}`,
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

const Page = async ({ searchParams }: Props) => {
  const data = await getDetail(searchParams.id, { draftKey: searchParams.dk });
  return <Article article={data} />;
};

export default Page;
