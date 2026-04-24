"use client";

import { useEffect } from "react";
import { Row, Col, Spin, Empty, Skeleton } from "antd";
import styles from "./style.module.scss";
import { useCartStore } from "@/library/stores/useCartStore";
import CartList from "../cart-list";
import CartSummary from "../cart-summary";
import Link from "next/link";
import CustomButton from "../public-button";
import { ArrowRightOutlined } from "@ant-design/icons";

const PublicCartPage = () => {
  const { items, isLoading, fetchCart } = useCartStore();
  console.log("Check items:", items);
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (isLoading && items?.length === 0) {
    return (
      <div className={styles.pageWrapper}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Skeleton.Input active size="large" style={{ width: 200 }} />
        </div>
        <Row gutter={[40, 40]}>
          <Col xs={24} lg={16}>
            <div className={styles.cartListContainer} style={{ padding: 20 }}>
              <Skeleton active paragraph={{ rows: 10 }} />
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <div className={styles.summaryCard}>
              <Skeleton active paragraph={{ rows: 6 }} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  if (!isLoading && (!items || items.length == 0)) {
    return (
      <div className={styles.emptyContainer}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Your cart is currently empty."
        />
        <Link href={`/products`}>
          <CustomButton>
            VIEW ALL PRODUCTS
            <ArrowRightOutlined />
          </CustomButton>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>YOUR CART</h1>

      <Row gutter={[40, 40]}>
        <Col xs={24} lg={16}>
          <CartList />
        </Col>

        <Col xs={24} lg={8}>
          <CartSummary />
        </Col>
      </Row>
    </div>
  );
};

export default PublicCartPage;
