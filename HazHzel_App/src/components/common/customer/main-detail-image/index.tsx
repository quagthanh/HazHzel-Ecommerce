"use client";
import styles from "@/components/common/customer/main-detail-image/style.module.scss";
import AppImage from "../../image/image";

export const MainImage = ({ images }: { images: string[] }) => {
  return (
    <div className={styles.mainImage}>
      {images.map((src, index) => (
        <div
          key={index}
          id={`main-image-${index}`}
          className={styles.mainImageWrapper}
        >
          <AppImage
            src={src}
            alt={`Main product image ${index + 1}`}
            style={{ objectFit: "contain" }}
            className={styles.image}
          />
        </div>
      ))}
    </div>
  );
};
