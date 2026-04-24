"use client";
import { Skeleton } from "antd";
import styles from "@/components/common/customer/skeleton/cart/style.module.scss";
export const CartItemSkeleton = ({ layout }: { layout: string }) => (
  <div
    className={`${styles.cartItem} ${layout === "two-column" ? styles.twoColumn : ""}`}
  >
    <div className={styles.cartImgWrapper}>
      <Skeleton.Image active style={{ width: 120, height: 160 }} />
    </div>

    <div className={styles.productInfo}>
      <Skeleton.Input
        active
        size="small"
        style={{ width: "60px", height: "12px", marginBottom: "8px" }}
      />
      <Skeleton.Input
        active
        size="small"
        style={{ width: "180px", height: "20px", marginBottom: "8px" }}
      />
      <Skeleton.Input
        active
        size="small"
        style={{ width: "80px", height: "14px", marginBottom: "12px" }}
      />

      <div style={{ display: "flex", gap: "8px" }}>
        <Skeleton.Input
          active
          size="small"
          style={{ width: "40px", height: "12px" }}
        />
        <Skeleton.Input
          active
          size="small"
          style={{ width: "40px", height: "12px" }}
        />
      </div>

      <div className={styles.quantityItem} style={{ marginTop: "15px" }}>
        <Skeleton.Button active style={{ width: "100px", height: "32px" }} />
        <Skeleton.Input
          active
          size="small"
          style={{ width: "50px", height: "12px" }}
        />
      </div>
    </div>
  </div>
);
