import { getArticleList } from "~/libs/articles";
import { Home } from "~/templates/Home";

const Page = async () => {
  const articles = await getArticleList();
  return <Home articles={articles} />;
};

export default Page;
