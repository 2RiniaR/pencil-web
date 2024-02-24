import { getDetail } from "~/libs/microcms";
import { Article } from "~/templates/Article";
import { siteName, siteUrl, twitterId } from "~/libs/const";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk: string;
  };
};

export const revalidate = 60;

export const generateMetadata = async ({ params, searchParams }: Props) => {
  const data = await getDetail(params.slug, { draftKey: searchParams.dk });
  return {
    title: `${data.title} - ${siteName}`,
    openGraph: {
      title: `${data.title} - ${siteName}`,
      siteName: siteName,
      type: "article",
      images: {
        url: `${siteUrl}/api/pages/${params.slug}/og-image?dk=${searchParams.dk}`,
        width: 1200,
        height: 630
      }
    },
    twitter: {
      card: "summary_large_image",
      creator: twitterId
    }
  };
};

const Page = async ({ params, searchParams }: Props) => {
  const data = await getDetail(params.slug, { draftKey: searchParams.dk });
  return <Article article={data} />;
};

export default Page;
