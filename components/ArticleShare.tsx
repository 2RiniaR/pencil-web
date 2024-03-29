import Image from "next/image";
import styles from "./ArticleShare.module.scss";
import twitterLogo from "public/twitter_logo.png";
import { ExternalLink } from "~/components/ExternalLink";
import facebookLogo from "public/facebook_logo.png";
import hatenabookmarkLogo from "public/hatenabookmark_logo.png";
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
          href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`}
          className={styles.element}
        >
          <Image src={twitterLogo} alt="X(旧Twitter)" width={24} className={styles.icon} />
        </ExternalLink>
        <ExternalLink
          aria-label="Facebookに投稿"
          href={`http://www.facebook.com/sharer.php?u=${url}`}
          className={styles.element}
        >
          <Image src={facebookLogo} alt="Facebook" width={24} className={styles.icon} />
        </ExternalLink>
        <ExternalLink
          aria-label="はてなブックマークに登録"
          href={`https://b.hatena.ne.jp/add?mode=confirm&url=${url}&title=${title}`}
          className={styles.element}
        >
          <Image src={hatenabookmarkLogo} alt="はてなブックマーク" width={24} className={styles.icon} />
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
