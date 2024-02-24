import { getList } from "~/libs/microcms";
import { Home } from "~/templates/Home";

const Page = async () => {
  const data = await getList({ limit: 50 });
  return <Home articles={data.contents} />;
};

export default Page;
