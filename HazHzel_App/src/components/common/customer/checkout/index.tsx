"use client";

import { Col, Row } from "antd";
import CheckoutForm from "../checkout-form";
import OrderSummary from "../order-summary";
import styles from "@/components/common/customer/checkout/style.module.scss";
const CheckoutPage = () => {
  return (
    <>
      <div className={styles.sectionSpacing}>
        <div className={styles.container}>
          <div className={styles.checkoutWrapper}>
            <Row>
              <Col span={12} className={styles.leftCol}>
                <CheckoutForm />
              </Col>
              <Col span={12} className={styles.rightCol}>
                <OrderSummary />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckoutPage;
