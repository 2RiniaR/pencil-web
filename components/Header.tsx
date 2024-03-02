import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";
import iconImage from "public/icon.jpg";
import { siteName } from "~/libs/const";
import { RandomMessage } from "~/components/RandomMessage";

export const Header = () => (
  <Link href="/" className={styles.root}>
    <div className={styles.title}>
      <Image src={iconImage} alt="アイコン" width={60} height={60} className={styles.icon} />
      <h1 className={styles.name}>{siteName}</h1>
    </div>
    <p className={styles.description}>
      <RandomMessage />
    </p>
  </Link>
);
