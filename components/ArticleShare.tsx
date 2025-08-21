import Image from "next/image";
import styles from "./ArticleShare.module.scss";
import twitterLogo from "public/twitter_logo.png";
import { ExternalLink } from "~/components/ExternalLink";
import linkIcon from "public/link_icon.svg";
import { ArticleContent } from "~/libs/microcms";
import { siteName, siteUrl } from "~/libs/const";
import { ClipboardButton } from "~/components/ClipboardButton";

type Props = {
  article: ArticleContent;
  displayMessage?: boolean;
};

export const ArticleShare = ({ article, displayMessage }: Props) => {
  const url = `${siteUrl}/pages/${article.id}`;
  const title = `${article.title} - ${siteName}`;

  return (
    <div className={styles.root}>
      {displayMessage && <div className={styles.title}>共有お願いします！</div>}
      <div className={styles.elementRoot}>
        <ExternalLink
          aria-label="X(旧Twitter)にポスト"
          href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(title)}`}
          className={styles.element}
        >
          <Image src={twitterLogo} alt="X(旧Twitter)" width={24} className={styles.icon} />
        </ExternalLink>
        <div className={styles.element}>
          <ClipboardButton content={`${title}\n${url}\n`}>
            <Image src={linkIcon} alt="リンク" width={24} className={styles.icon} />
          </ClipboardButton>
        </div>
      </div>
    </div>
  );
};
