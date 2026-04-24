"use client";
import React from "react";
import { Typography } from "antd";
import styles from "@/components/common/auth/circular-progress/style.module.scss";
const { Text } = Typography;

interface CircularProgressProps {
  percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const dashArray = `${circumference * (percentage / 100)} ${circumference}`;

  return (
    <div className={styles.circularProgressWrapper}>
      <div className={styles.circularProgress}>
        <svg width="120" height="120" className={styles.circularProgressSvg}>
          <circle
            cx="60"
            cy="60"
            r={radius}
            className={styles.circularProgressBg}
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            className={styles.circularProgressFill}
            strokeDasharray={dashArray}
          />
        </svg>
        <div className={styles.circularProgressContent}>
          <Text type="secondary" className={styles.circularProgressLabel}>
            Total
          </Text>
          <Text strong className={styles.circularProgressValue}>
            {percentage}%
          </Text>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
