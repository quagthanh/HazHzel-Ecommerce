"use client";
import { useState } from "react";
import { Col, Row } from "antd";
import CheckoutForm from "../checkout-form";
import OrderSummary from "../order-summary";
import styles from "@/components/common/customer/checkout/style.module.scss";

interface Address {
  name: string;
  phone: string;
  street: string;
  ward: string;
  city: string;
}

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  return (
    <div className={styles.sectionSpacing}>
      <div className={styles.container}>
        <div className={styles.checkoutWrapper}>
          <Row>
            <Col span={12} className={styles.leftCol}>
              <CheckoutForm onAddressChange={setSelectedAddress} />
            </Col>
            <Col span={12} className={styles.rightCol}>
              <OrderSummary selectedAddress={selectedAddress} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
