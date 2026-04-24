"use client";
import styles from "@/components/common/customer/thumbnail-list/style.module.scss";
import AppImage from "../../image/image";

const ThumbnailList = ({ images }: { images: string[] }) => {
  const handleClick = (index: number) => {
    const image = document.getElementById(`main-image-${index}`);
    image?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={styles.thumbnailList}>
      {images.map((src, index) => (
        <div
          key={index}
          className={styles.thumbnailItem}
          onClick={() => handleClick(index)}
        >
          <AppImage src={src} alt={`thumb-${index}`} className={styles.image} />
        </div>
      ))}
    </div>
  );
};

export default ThumbnailList;
