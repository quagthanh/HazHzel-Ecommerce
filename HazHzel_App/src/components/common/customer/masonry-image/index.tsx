"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";

interface MasonryImageProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string;
  alt?: string;
  wrapperClassName?: string;
}

const MasonryImage = ({
  src,
  alt = "",
  className,
  wrapperClassName,
  ...props
}: MasonryImageProps) => {
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return <div className={styles.fallback} />;
  }

  return (
    <div className={clsx(styles.wrapper, wrapperClassName)}>
      {!loaded && <div className={styles.skeleton} />}

      <Image
        src={src}
        alt={alt}
        width={500}
        height={0}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ width: "100%", height: "auto", display: "block" }}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={clsx(styles.image, className)}
        {...props}
      />
    </div>
  );
};

export default MasonryImage;
