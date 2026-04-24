"use client";
import React from "react";
import { Typography } from "antd";
import styles from "@/components/common/auth/login-analytics-preview/style.module.scss";
import DecorativeSquares from "../decorative-squares";
import AnalyticsCard from "../analytics-card";
const { Title, Text } = Typography;

const AnalyticsPreview = () => {
  return (
    <div className={styles.analyticsPreview}>
      <DecorativeSquares />
      <AnalyticsCard />

      <div className={styles.analyticsDescription}>
        <Title level={4} className={styles.analyticsTitle}>
          Very simple way you can engage
        </Title>
        <Text className={styles.analyticsTitle}>
          Welcome to (DAILY) Inventory Management System! Efficiently track and
          manage your inventory with ease.
        </Text>
      </div>
    </div>
  );
};

export default AnalyticsPreview;
