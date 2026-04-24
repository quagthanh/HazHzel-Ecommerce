"use client";

import { Button, Empty } from "antd";
import styles from "./style.module.scss";

const OrdersSection = () => {
  return (
    <div className={styles.profileSection}>
      <h1 className={styles.sectionTitle}>ĐƠN HÀNG</h1>
      <div className={styles.emptyState}>
        <Empty description="Bạn chưa có đơn hàng nào" />
        <Button
          href="/"
          className={styles.submitBtn}
          style={{ marginTop: 24, width: "auto" }}
        >
          MUA SẮM NGAY
        </Button>
      </div>
    </div>
  );
};

export default OrdersSection;
