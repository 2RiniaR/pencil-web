import Link from "next/link";
import { ArticleContent, getTypeColor } from "~/libs/articles";
import { PageLayout } from "~/templates/PageLayout";
import styles from "~/templates/Article.module.scss";
import { formatDisplayDate } from "~/libs/datetime";
import { ArticleShare } from "~/components/ArticleShare";
import { About } from "~/components/About";
import { ArticleBody } from "~/components/ArticleBody";

type Props = {
  article: ArticleContent;
  parsedBody: React.ReactNode;
};

export const Article = ({ article, parsedBody }: Props) => (
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
      <ArticleBody parsedContent={parsedBody} />
      <div className={styles.about}>
        <About />
      </div>
      <div className={styles.share}>
        <ArticleShare article={article} displayMessage />
      </div>
    </div>
  </PageLayout>
);
