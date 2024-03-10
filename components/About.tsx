import Image from "next/image";
import React from "react";
import styles from "./About.module.scss";
import iconImage from "public/icon.jpg";
import { ExternalLink } from "~/components/ExternalLink";
import { twitterId } from "~/libs/const";
import twitterLogo from "public/twitter_logo.png";
import githubLogo from "public/github_logo.png";
import youtubeLogo from "public/youtube_logo.png";
import mailIcon from "public/mail_icon.png";

export const About = () => {
  return (
    <div className={styles.root}>
      <Image src={iconImage} alt="Rinia／りにあ" className={styles.icon} width={100} height={100} />
      <div className={styles.top}>
        <div className={styles.name}>Rinia／りにあ</div>
        <div className={styles.linkRoot}>
          <ExternalLink className={styles.element} href={`https://x.com/${twitterId}`}>
            <Image src={twitterLogo} alt="X(旧Twitter)" width={24} className={styles.image} />
          </ExternalLink>
          <ExternalLink className={styles.element} href="https://mail.google.com/mail/?view=cm&to=7rinia@gmail.com">
            <Image src={mailIcon} alt="メール" width={24} className={styles.image} />
          </ExternalLink>
          <ExternalLink className={styles.element} href="https://www.youtube.com/@2riniar">
            <Image src={youtubeLogo} alt="YouTube" width={24} className={styles.image} />
          </ExternalLink>
          <ExternalLink className={styles.element} href="https://github.com/2RiniaR">
            <Image src={githubLogo} alt="GitHub" width={24} className={styles.image} />
          </ExternalLink>
        </div>
      </div>
      <div className={styles.detail}>
        <p className={styles.profile}>
          某社でUnityエンジニアをしてます。
          <ExternalLink href="https://approvers.dev/">限界開発鯖</ExternalLink>／
          <ExternalLink href="https://rinear.net/">RineaR</ExternalLink>
          所属。
        </p>
        <p>
          幼少期から周りを巻き込んで企画をすることが好きで、現在はゲーム作り以外にもWeb開発・コミュニティ活動・デザイン等を趣味でやってます。
        </p>
      </div>
    </div>
  );
};
