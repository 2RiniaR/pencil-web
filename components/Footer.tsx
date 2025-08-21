import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";
import { ExternalLink } from "./ExternalLink";
import { siteName, twitterId } from "~/libs/const";

export const Footer = () => (
  <footer className={styles.root}>
    <div className={styles.name}>{siteName}</div>
    <div className={styles.copyright}>Copyright © 2024 Rinia All rights reserved.</div>
    <div className={styles.links}>
      <Link className={styles.element} href="/">
        ホーム
      </Link>
      <ExternalLink className={styles.element} href={`https://x.com/${twitterId}`}>
        X(Twitter)
      </ExternalLink>
      <ExternalLink className={styles.element} href="https://github.com/2RiniaR">
        GitHub
      </ExternalLink>
      <ExternalLink className={styles.element} href="https://rinear.net/">
        RineaRの筏
      </ExternalLink>
    </div>
  </footer>
);
