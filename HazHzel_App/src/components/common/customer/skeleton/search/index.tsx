"use client";
import styles from "@/components/common/customer/skeleton/search/style.module.scss";
import { Col, Row, Skeleton } from "antd";
export const ProductSkeleton = () => (
  <Row gutter={[20, 30]}>
    {Array.from({ length: 4 }).map((_, index) => (
      <Col key={index} xs={12} sm={12} md={6}>
        <div className={styles.productCard}>
          <div
            className={styles.productImage}
            style={{
              background: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Skeleton.Image active style={{ width: "100%", height: "100%" }} />
          </div>
          <div className={styles.productInfo} style={{ marginTop: 12 }}>
            <Skeleton.Input
              active
              size="small"
              style={{ width: "40%", height: 14, marginBottom: 8 }}
            />
            <Skeleton.Input
              active
              size="small"
              style={{ width: "100%", height: 18, marginBottom: 8 }}
            />
            <Skeleton.Input
              active
              size="small"
              style={{ width: "30%", height: 14 }}
            />
          </div>
        </div>
      </Col>
    ))}
  </Row>
);
