"use client";
import { ReactNode, useState } from "react";
import styles from "./ClipboardButton.module.scss";
import { mc } from "~/libs/dom";

type Props = {
  content: string;
  children: ReactNode;
  className?: string;
};

export const ClipboardButton = ({ content, children, className }: Props) => {
  const [isHover, setIsHover] = useState(false);

  const onClick = async () => {
    await navigator.clipboard.writeText(content);
    setIsHover(true);
    setTimeout(() => setIsHover(false), 500);
  };

  return (
    <button aria-label="リンクをコピー" className={mc(styles.root, className ?? "")} onClick={onClick}>
      <div className={mc(styles.hover, isHover ? styles.active : styles.inactive)}>コピーしました！</div>
      {children}
    </button>
  );
};
