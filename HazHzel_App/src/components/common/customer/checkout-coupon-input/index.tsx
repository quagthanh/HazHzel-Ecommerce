"use client";
import styles from "@/components/common/customer/checkout-coupon-input/style.module.scss";

export default function CouponInput() {
  return (
    <div className={styles.couponRow}>
      <input
        className={styles.input}
        type="text"
        placeholder="Discount code or gift card"
      />
      <button className={styles.button}>Apply</button>
    </div>
  );
}
