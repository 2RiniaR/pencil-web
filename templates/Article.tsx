import Link from "next/link";
import { ArticleContent, getTypeColor } from "~/libs/microcms";
import { PageLayout } from "~/templates/PageLayout";
import styles from "~/templates/Article.module.scss";
import { formatDisplayDate } from "~/libs/datetime";
import { formatRichText } from "~/libs/microcms-client";
import { ArticleShare } from "~/components/ArticleShare";
import { About } from "~/components/About";
import { ArticleBody } from "~/components/ArticleBody";

type Props = {
  article: ArticleContent;
};

export const Article = ({ article }: Props) => (
  <PageLayout>
    <div className={styles.root}>
      <Link href="/" className={styles.back}>
        {"<"} 一覧へ
      </Link>
      <div className={styles.heading} style={{ borderLeft: `8px solid ${getTypeColor(article.type)}` }}>
        <div className={styles.title}>{article.title}</div>
        <div className={styles.date}>{formatDisplayDate(article.publishedAt)}</div>
      </div>
      <div className={styles.share}>
        <ArticleShare article={article} />
      </div>
      <ArticleBody content={formatRichText(article.body)} />
      <div className={styles.about}>
        <About />
      </div>
      <div className={styles.share}>
        <ArticleShare article={article} displayMessage />
      </div>
    </div>
  </PageLayout>
);
