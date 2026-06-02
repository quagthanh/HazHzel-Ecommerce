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
  const [addressData, setAddressData] = useState<Address | null>(null);

  return (
    <div className={styles.sectionSpacing}>
      <div className={styles.container}>
        <div className={styles.checkoutWrapper}>
          <Row>
            <Col xs={24} lg={12} className={styles.leftCol}>
              <CheckoutForm onAddressChange={setAddressData} />
            </Col>
            <Col xs={24} lg={12} className={styles.rightCol}>
              <OrderSummary selectedAddress={addressData} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
