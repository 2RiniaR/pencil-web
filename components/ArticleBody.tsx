"use client";

import { useState, useCallback, useEffect, ReactNode } from "react";
import styles from "./ArticleBody.module.scss";
import { ImageOverlay } from "~/components/ImageOverlay";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

type Props = {
  parsedContent: ReactNode;
  hasTwitterEmbed?: boolean;
};

export const ArticleBody = ({ parsedContent, hasTwitterEmbed }: Props) => {
  const [overlayImage, setOverlayImage] = useState<{ src: string; alt: string } | null>(null);

  const handleImageClick = useCallback((src: string, alt: string) => {
    setOverlayImage({ src, alt });
  }, []);

  // Twitter widgets.jsの読み込み
  useEffect(() => {
    if (!hasTwitterEmbed) return;

    if (window.twttr?.widgets) {
      window.twttr.widgets.load();
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
    }
  }, [hasTwitterEmbed]);

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
