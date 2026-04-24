"use client";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import { ROUTE_CONFIG } from "@/shared/configs/route";
import { statusProduct } from "@/types/enum";
import { IProduct } from "@/types/interface";
import styles from "@/components/common/customer/product-card/style.module.scss";
import AppImage from "../../image/image";

const ProductCard = ({
  name,
  slug,
  images,
  categoryId,
  status,
  isSale,
  variants,
  originalPrice,
  currentPrice,
}: IProduct) => {
  const isInactive = status === statusProduct.INACTIVE;

  const mainImage = images?.[0]?.secure_url;

  let hoverImage = images?.[1]?.secure_url;
  if (!hoverImage) {
    hoverImage = variants?.images?.[0]?.secure_url ?? hoverImage;
  }
  console.log("Check main:", mainImage);
  console.log("Check hoverImage:", hoverImage);
  return (
    <Link href={`${ROUTE_CONFIG.product}/${slug}`}>
      <div className={`${styles.card} ${isInactive ? styles.soldOut : ""}`}>
        <div className={styles.imageWrapper}>
          <AppImage
            src={mainImage}
            alt={name}
            className={styles.image}
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <AppImage
            src={hoverImage}
            alt={`${name} hover`}
            className={`${styles.image} ${styles.hoverImage}`}
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <button className={styles.addToCart}>
            <PlusOutlined size={18} className={styles.plusIcon} />
          </button>
        </div>

        <div className={styles.productInfo}>
          <div className={styles.categoryTag}>{categoryId?.name}</div>
          <h3 className={styles.productName}>{name}</h3>
          <div className={styles.priceWrapper}>
            <span className={styles.originalPrice}>
              {originalPrice ? originalPrice.toLocaleString("vi-VN") : 0}₫
            </span>
            <span className={styles.price}>
              {currentPrice ? currentPrice.toLocaleString("vi-VN") : 0}₫
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
