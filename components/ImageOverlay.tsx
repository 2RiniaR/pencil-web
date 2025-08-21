import { useEffect, useCallback, useState, useRef } from "react";
import styles from "./ImageOverlay.module.scss";

type Props = {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
};

export const ImageOverlay = ({ src, alt, isOpen, onClose }: Props) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const resetTransform = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // ホイールズーム
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 3));
  }, []);

  // マウスドラッグ
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (scale > 1) {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      }
    },
    [scale, position]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // タッチ操作
  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2));
  };

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        const distance = getTouchDistance(e.touches);
        setLastTouchDistance(distance);
      } else if (e.touches.length === 1 && scale > 1) {
        const touch = e.touches[0];
        setIsDragging(true);
        setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
      }
    },
    [scale, position]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        const distance = getTouchDistance(e.touches);
        if (lastTouchDistance > 0) {
          const delta = (distance - lastTouchDistance) * 0.01;
          setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 3));
        }
        setLastTouchDistance(distance);
      } else if (e.touches.length === 1 && isDragging) {
        const touch = e.touches[0];
        setPosition({
          x: touch.clientX - dragStart.x,
          y: touch.clientY - dragStart.y
        });
      }
    },
    [lastTouchDistance, isDragging, dragStart]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setLastTouchDistance(0);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.overflow = "hidden";
      resetTransform();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown, handleMouseMove, handleMouseUp, resetTransform]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
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
        <div
          className={styles.imageContainer}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            className={styles.image}
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              transition: isDragging ? "none" : "transform 0.1s ease-out"
            }}
            onMouseDown={handleMouseDown}
            onDoubleClick={resetTransform}
            role="presentation"
          />
        </div>
        {scale > 1 && (
          <button className={styles.resetButton} onClick={resetTransform} aria-label="ズームリセット">
            ⌂
          </button>
        )}
      </div>
    </div>
  );
};
