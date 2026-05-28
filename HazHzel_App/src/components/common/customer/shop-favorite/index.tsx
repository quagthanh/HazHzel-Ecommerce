"use client";
import styles from "@/components/common/customer/shop-favorite/style.module.scss";
import CustomButton from "@/components/common/customer/public-button";
import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { IProduct } from "@/types/interface";
import { formatPriceHelper } from "@/utils/helper";
import NewBrandSwiper from "../new_brand_swiper";
import AppImage from "../../image/image";

interface ShopFavoritesProps {
  products?: IProduct[];
}

const ShopFavoritesUI = ({ products = [] }: ShopFavoritesProps) => {
  if (!products || products.length === 0) return null;

  return (
    <section id="shop-favorites">
      <div className={styles.sectionSpacing}>
        <div className={styles.container}>
          <div className={styles.sectionStack}>
            <div className={styles.shopFavoriteCarousel}>
              <h1 className={styles.title}>NEW BRAND - NIKE</h1>

              <NewBrandSwiper
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {products.map((item) => (
                  <SwiperSlide key={item._id}>
                    <div className={styles.slide}>
                      <div className={styles.imageContainer}>
                        <div className={styles.badgeGroup}>
                          {item.isHot && (
                            <span className={styles.badge}>HOT</span>
                          )}
                          {item.isSale && (
                            <span className={styles.badge}>SALE</span>
                          )}
                        </div>
                        <Link href={`/products/${item.slug}`}>
                          <AppImage
                            src={
                              item.images?.[0]?.secure_url ||
                              "/placeholder.webp"
                            }
                            alt={item.name}
                            className={styles.slideImage}
                          />
                        </Link>
                      </div>
                      <h3 className={styles.itemName}>
                        <Link
                          href={`/products/${item.slug}`}
                          className={styles.link}
                        >
                          {item.name}
                        </Link>
                      </h3>
                      <div className={styles.priceGroup}>
                        {item.isSale ? (
                          <>
                            <span className={styles.itemPriceLineThrough}>
                              {formatPriceHelper(item.originalPrice)}
                            </span>
                            <span className={styles.itemPrice}>
                              {formatPriceHelper(item.currentPrice)}
                            </span>
                          </>
                        ) : (
                          <p className={styles.itemPrice}>
                            {formatPriceHelper(item.currentPrice)}
                          </p>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </NewBrandSwiper>

              <div className={styles.cardContent}>
                <Link href="/stores/nike">
                  <CustomButton>VIEW ALL</CustomButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopFavoritesUI;
