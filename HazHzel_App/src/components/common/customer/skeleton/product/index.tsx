"use client";
import React from "react";
import { Skeleton } from "antd";
import styles from "@/components/common/customer/shop-favorite/style.module.scss";

// Component con cho từng thẻ sản phẩm
const SkeletonProduct = () => {
  return (
    <div className={styles.slide}>
      <div className={styles.imageContainer}>
        {/* Sử dụng class để ép kích thước */}
        <Skeleton.Image
          active
          className={styles.skeletonImage} 
        />
      </div>

      <div style={{ marginTop: "16px" }}>
        <Skeleton.Input
          active
          size="small"
          style={{ width: "80%", marginBottom: "10px" }}
        />
        <Skeleton.Input active size="small" style={{ width: "40%" }} />
      </div>
    </div>
  );
};

// Component bao bọc toàn bộ section
const SkeletonGrid = () => {
  return (
    <section id="shop-favorites">
      <div className={styles.sectionSpacing}>
        <div className={styles.container}>
          <div className={styles.sectionStack}>
            <div className={styles.shopFavoriteCarousel}>
              {/* Tiêu đề giả */}
              <h1 className={styles.title} style={{ opacity: 0.3 }}>
                NEW BRAND
              </h1>

              {/* Grid giả lập 4 cột giống Swiper breakpoint 1024 */}
              <div style={{ display: "flex", gap: "20px" }}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} style={{ flex: "0 0 25%" }}>
                    <SkeletonProduct />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonGrid;
