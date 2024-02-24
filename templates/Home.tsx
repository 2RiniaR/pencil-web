import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.scss";
import { ArticleContent } from "~/libs/microcms";
import { formatExceededTime } from "~/libs/datetime";
import { PageLayout } from "~/templates/PageLayout";
import defaultThumbnail from "public/default_thumbnail.png";

type Props = {
  articles: ArticleContent[];
};

export const Home = ({ articles }: Props) => (
  <PageLayout>
    <div className={styles.root}>
      {articles.map((article) => (
        <Link key={article.id} href={`pages/${article.id}`} className={styles.article}>
          <Image
            src={article.thumbnail?.url ?? defaultThumbnail}
            width={96}
            height={54}
            alt={article.title}
            className={styles.thumbnail}
          />
          <div className={styles.content}>
            <p className={styles.name}>{article.title}</p>
            <p className={styles.date}>{formatExceededTime(article.publishedAt)}</p>
          </div>
        </Link>
      ))}
    </div>
  </PageLayout>
);
