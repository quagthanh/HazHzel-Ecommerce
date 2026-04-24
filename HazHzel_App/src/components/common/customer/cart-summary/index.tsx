"use client";

import { Button, Divider, Progress, Tooltip } from "antd";
import {
  CreditCardOutlined,
  SafetyCertificateOutlined,
  BankOutlined,
  CheckCircleFilled,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useCartStore } from "@/library/stores/useCartStore";
import styles from "./style.module.scss";

const CartSummary = () => {
  const subtotal = useCartStore((state) => state.getTotalPrice());

  const FREE_SHIPPING_THRESHOLD = 2000000;
  // const SHIPPING_COST = 50000;

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const gap = FREE_SHIPPING_THRESHOLD - subtotal;
  const progressPercent = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );
  const total = subtotal;

  return (
    <div className={styles.summaryCard}>
      <h3 className={styles.summaryTitle}>CART SUMMARY</h3>
      <div className={styles.shippingProgress}>
        {/* {isFreeShipping ? ( */}
        <p className={styles.progressTextSuccess}>
          <CheckCircleFilled style={{ color: "#52c41a", marginRight: 5 }} />
          Congratulations! You have got <strong>Free Shipping</strong>.
        </p>
        {/* ) : (
          <p className={styles.progressText}>
            Add <strong>{gap?.toLocaleString("vi-VN") || "Nan"}đ</strong> more
            to get <span className={styles.highlight}>Free Shipping</span>
          </p>
        )} */}

        {/* <Progress
          percent={progressPercent}
          showInfo={false}
          strokeColor="#000"
          trailColor="#e5e5e5"
          size="small"
          className={styles.progressBar}
        /> */}
      </div>

      <Divider className={styles.divider} />

      <div className={styles.summaryRow}>
        <span>Subtotal</span>
        <span>{subtotal?.toLocaleString("vi-VN") || "Nan"}đ</span>
      </div>

      <div className={styles.summaryRow}>
        <span className={styles.labelWithIcon}>
          Shipping
          {!isFreeShipping && (
            <Tooltip title="Free shipping on orders over 2.000.000đ">
              <InfoCircleOutlined className={styles.infoIcon} />
            </Tooltip>
          )}
        </span>
        {/* {isFreeShipping ? ( */}
        <span className={styles.freeText}>Free</span>
        {/* ) : (
          <span>{SHIPPING_COST?.toLocaleString("vi-VN") || "Nan"}đ</span>
        )} */}
      </div>

      <Divider className={styles.divider} />

      <div className={`${styles.summaryRow} ${styles.totalRow}`}>
        <span>TOTAL</span>
        <span>{total?.toLocaleString("vi-VN") || "Nan"}đ</span>
      </div>

      <div className={styles.checkoutAction}>
        <Link href="/checkout" style={{ width: "100%" }}>
          <Button
            type="primary"
            size="large"
            block
            className={styles.checkoutBtn}
          >
            CHECKOUT
          </Button>
        </Link>

        <div className={styles.trustSection}>
          <div className={styles.trustHeader}>
            <SafetyCertificateOutlined /> Secure Checkout
          </div>
          <div className={styles.paymentIcons}>
            <div className={styles.payIcon} title="Visa/Mastercard">
              <CreditCardOutlined />
            </div>
            <div className={styles.payIcon} title="Banking">
              <BankOutlined />
            </div>
            <div className={styles.payIcon} title="COD">
              COD
            </div>
          </div>
          <p className={styles.policyText}>Easy Returns • 30 Days Money Back</p>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
