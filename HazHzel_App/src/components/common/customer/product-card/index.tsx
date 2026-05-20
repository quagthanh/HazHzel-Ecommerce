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
  categories,
  supplier,
  status,
  isSale,
  variants,
  originalPrice,
  currentPrice = 0,
}: IProduct) => {
  const isInactive = status === statusProduct.INACTIVE;

  const mainImage = images?.[0]?.secure_url;

  let hoverImage = images?.[1]?.secure_url;
  if (!hoverImage) {
    hoverImage = variants?.images?.[0]?.secure_url ?? hoverImage;
  }

  // const categoryName = categories?.[0]?.name;
  const supplierName = supplier?.name;

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

          {hoverImage && (
            <AppImage
              src={hoverImage}
              alt={`${name} hover`}
              className={`${styles.image} ${styles.hoverImage}`}
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          <button className={styles.addToCart}>
            <PlusOutlined size={18} className={styles.plusIcon} />
          </button>
        </div>

        <div className={styles.productInfo}>
          {/* <div className={styles.categoryTag}>{categoryName}</div> */}

          {supplierName && (
            <div className={styles.supplierName}>{supplierName}</div>
          )}

          <h3 className={styles.productName}>{name}</h3>

          <div className={styles.priceWrapper}>
            {originalPrice && originalPrice > currentPrice && (
              <span className={styles.originalPrice}>
                {originalPrice.toLocaleString("vi-VN")}₫
              </span>
            )}

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
