"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import parse, { Element, HTMLReactParserOptions } from "html-react-parser";
import styles from "./ArticleBody.module.scss";
import { ImageOverlay } from "~/components/ImageOverlay";

type Props = {
  content: string;
};

export const ArticleBody = ({ content }: Props) => {
  const [overlayImage, setOverlayImage] = useState<{ src: string; alt: string } | null>(null);
  const imageRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // HTMLコンテンツの前処理: 不要なタグを除去
  const cleanedContent = content
    .replace(/<html[^>]*>/gi, "")
    .replace(/<\/html>/gi, "")
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "")
    .replace(/<body[^>]*>/gi, "")
    .replace(/<\/body>/gi, "");

  const handleImageClick = useCallback((src: string, alt: string) => {
    setOverlayImage({ src, alt });
  }, []);

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        // imgタグをNext/Imageに変換
        if (domNode.name === "img") {
          const { src, alt, width, height } = domNode.attribs;

          // 画像URLがmicroCMSのものかチェック
          if (!src) return;

          // widthとheightが指定されていない場合のデフォルト値
          const imgWidth = width ? parseInt(width, 10) : 800;
          const imgHeight = height ? parseInt(height, 10) : 600;

          return (
            <div
              ref={(el) => {
                if (el) imageRefs.current.set(src, el);
              }}
              style={{
                cursor: "zoom-in"
              }}
              onClick={() => handleImageClick(src, alt || "")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleImageClick(src, alt || "");
                }
              }}
              role="button"
              tabIndex={0}
            >
              <Image src={src} alt={alt || ""} width={imgWidth} height={imgHeight} />
            </div>
          );
        }
      }
    }
  };

  const parsedContent = parse(cleanedContent, options);

  return (
    <>
      <div className={styles.body}>{parsedContent}</div>
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
