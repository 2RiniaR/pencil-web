"use client";

import { useState, useEffect } from "react";
import { ImageOverlay } from "~/components/ImageOverlay";
import styles from "~/templates/Article.module.scss";

type Props = {
  content: string;
};

export const ArticleBody = ({ content }: Props) => {
  const [overlayImage, setOverlayImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const handleImageClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" && target.closest(`.${styles.body}`)) {
        const img = target as HTMLImageElement;
        setOverlayImage({
          src: img.src,
          alt: img.alt || ""
        });
      }
    };

    const bodyElement = document.querySelector(`.${styles.body}`);
    if (bodyElement) {
      bodyElement.addEventListener("click", handleImageClick as EventListener);

      // 画像にカーソルスタイルを追加
      const images = bodyElement.querySelectorAll("img");
      images.forEach((img) => {
        (img as HTMLImageElement).style.cursor = "zoom-in";
      });
    }

    return () => {
      if (bodyElement) {
        bodyElement.removeEventListener("click", handleImageClick as EventListener);
      }
    };
  }, []);

  return (
    <>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: content }}></div>
      {overlayImage && (
        <ImageOverlay
          src={overlayImage.src}
          alt={overlayImage.alt}
          isOpen={!!overlayImage}
          onClose={() => setOverlayImage(null)}
        />
      )}
    </>
  );
};
