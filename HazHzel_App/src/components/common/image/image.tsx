"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import clsx from "clsx";
import styles from "@/components/common/image/style.module.scss";

interface AppImageProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string;
  alt?: string;
  className?: string;
}
const BrokenImageIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);
const AppImage = ({ src, alt = "", className, ...props }: AppImageProps) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || error) {
    return (
      <div className={clsx(styles.wrapper, styles.fallback, className)}>
        <div className={styles.fallbackContent}>
          <span className={styles.icon}>
            <BrokenImageIcon />
          </span>
          <span className={styles.altText}>{alt}</span>
        </div>
      </div>
    );
  }
  return (
    <div className={clsx(styles.wrapper, className)}>
      {!loaded && <div className={styles.skeleton} />}

      <Image
        src={src}
        alt={alt}
        style={{ objectFit: "cover" }}
        fill
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
};

export default AppImage;
