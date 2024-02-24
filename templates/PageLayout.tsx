import { ReactNode } from "react";
import styles from "./PageLayout.module.scss";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

type Props = {
  children: ReactNode;
};

export const PageLayout = ({ children }: Props) => (
  <div className={styles.root}>
    <div className={styles.content}>
      <Header />
      <div className={styles.inner}>{children}</div>
      <Footer />
    </div>
  </div>
);
