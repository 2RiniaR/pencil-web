"use client";

import { useState, useCallback, ReactNode } from "react";
import styles from "./ArticleBody.module.scss";
import { ImageOverlay } from "~/components/ImageOverlay";

type Props = {
  parsedContent: ReactNode;
};

export const ArticleBody = ({ parsedContent }: Props) => {
  const [overlayImage, setOverlayImage] = useState<{ src: string; alt: string } | null>(null);

  const handleImageClick = useCallback((src: string, alt: string) => {
    setOverlayImage({ src, alt });
  }, []);

  // parsedContentに画像クリックハンドラーを追加
  const enhancedContent =
    typeof parsedContent === "object" ? (
      <div
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.tagName === "IMG") {
            const img = target as HTMLImageElement;
            handleImageClick(img.src, img.alt || "");
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            const target = e.target as HTMLElement;
            if (target.tagName === "IMG") {
              const img = target as HTMLImageElement;
              handleImageClick(img.src, img.alt || "");
            }
          }
        }}
        role="presentation"
      >
        {parsedContent}
      </div>
    ) : (
      parsedContent
    );

  return (
    <>
      <div className={styles.body}>{enhancedContent}</div>
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
