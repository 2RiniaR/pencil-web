import { getArticleBySlug, getAllSlugs } from "~/libs/articles";
import { renderMarkdown } from "~/libs/markdown";
import { Article } from "~/templates/Article";
import { siteName, siteUrl, twitterId } from "~/libs/const";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateStaticParams = async () => {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug
  }));
};

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  return {
    title: `${article.title} - ${siteName}`,
    description: article.description,
    openGraph: {
      url: siteUrl,
      title: `${article.title} - ${siteName}`,
      description: article.description,
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
  const article = await getArticleBySlug(slug);
  const { content: parsedBody, hasTwitterEmbed } = await renderMarkdown(article.body, slug);

  return <Article article={article} parsedBody={parsedBody} hasTwitterEmbed={hasTwitterEmbed} />;
};

export default Page;
