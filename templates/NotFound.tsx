import React from "react";
import styles from "./NotFound.module.scss";
import { PageLayout } from "~/templates/PageLayout";

export const NotFound = () => (
  <PageLayout>
    <h1 className={styles.title}>404 - Not Found</h1>
    <p className={styles.description}>お探しのページは存在しません。</p>
  </PageLayout>
);
