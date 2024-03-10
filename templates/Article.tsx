import Link from "next/link";
import { ArticleContent } from "~/libs/microcms";
import { PageLayout } from "~/templates/PageLayout";
import styles from "~/templates/Article.module.scss";
import { formatDisplayDate } from "~/libs/datetime";
import { formatRichText } from "~/libs/microcms-client";
import { ArticleShare } from "~/components/ArticleShare";
import { About } from "~/components/About";

type Props = {
  article: ArticleContent;
};

export const Article = ({ article }: Props) => (
  <PageLayout>
    <div className={styles.root}>
      <Link href="/" className={styles.back}>
        {"<"} 一覧へ
      </Link>
      <div className={styles.heading}>
        <div className={styles.title}>{article.title}</div>
        <div className={styles.date}>{formatDisplayDate(article.publishedAt)}</div>
        <div className={styles.share}>
          <ArticleShare article={article} />
        </div>
      </div>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: formatRichText(article.body) }}></div>
      <div className={styles.about}>
        <About />
      </div>
      <div className={styles.share}>
        <ArticleShare article={article} displayMessage />
      </div>
    </div>
  </PageLayout>
);
