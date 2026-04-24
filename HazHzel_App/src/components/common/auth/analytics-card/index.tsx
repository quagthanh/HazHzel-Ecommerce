import React from "react";
import { Typography } from "antd";
import styles from "@/components/common/auth/analytics-card/style.module.scss"; // Import CSS Module
import LineChart from "@/components/common/auth/line-chart";
import CircularProgress from "@/components/common/auth/circular-progress";

const { Title } = Typography;

const AnalyticsCard = () => {
  const periods = ["Weekly", "Monthly", "Yearly"];

  return (
    <div className={styles.analyticsCard}>
      <div className={styles.analyticsCardHeader}>
        <Title level={4} className={styles.analyticsCardTitle}>
          Analytics
        </Title>
        <div className={styles.analyticsCardTabs}>
          {periods.map((period, idx) => (
            <span
              key={period}
              className={`${styles.analyticsTab} ${
                idx === 0 ? styles.analyticsTabActive : ""
              }`}
            >
              {period}
            </span>
          ))}
        </div>
      </div>
      <LineChart />
      <CircularProgress percentage={42} />
    </div>
  );
};

export default AnalyticsCard;
