import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.scss";
import { ArticleContent, getTypeColor } from "~/libs/articles";
import { PageLayout } from "~/templates/PageLayout";
import defaultThumbnail from "public/default_thumbnail.png";
import { ExceedTime } from "~/components/ExceedTime";
import { About } from "~/components/About";

type Props = {
  articles: ArticleContent[];
};

export const Home = ({ articles }: Props) => (
  <PageLayout>
    <div className={styles.root}>
      <div className={styles.about}>
        <About />
      </div>
      {articles.map((article) => (
        <Link key={article.slug} href={`pages/${article.slug}`} className={styles.article}>
          <div className={styles.content} style={{ borderLeft: `8px solid ${getTypeColor(article.type)}` }}>
            <p className={styles.name}>{article.title}</p>
            <p className={styles.detail}>{article.description}</p>
            <p className={styles.date}>
              <ExceedTime from={article.publishedAt} />
            </p>
          </div>
          <Image
            src={article.thumbnail ?? defaultThumbnail}
            width={320}
            height={180}
            alt={article.title}
            className={styles.thumbnail}
          />
        </Link>
      ))}
    </div>
  </PageLayout>
);
