import { useEffect, useCallback } from "react";
import styles from "./ImageOverlay.module.scss";

type Props = {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
};

export const ImageOverlay = ({ src, alt, isOpen, onClose }: Props) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClose();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="画像を閉じる"
    >
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={onClose} aria-label="閉じる">
          ✕
        </button>
        <img src={src} alt={alt} className={styles.image} />
      </div>
    </div>
  );
};
