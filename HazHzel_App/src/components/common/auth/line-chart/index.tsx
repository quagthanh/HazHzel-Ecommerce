"use client";
import React from "react";
import { Typography } from "antd";
import styles from "@/components/common/auth/line-chart/style.module.scss";

const { Text } = Typography;

const LineChart = () => {
  const days = ["MON", "TUE", "WED", "THU"];

  return (
    <div className={styles.lineChart}>
      <svg
        width="100%"
        height="160"
        viewBox="0 0 500 160"
        preserveAspectRatio="none"
        className={styles.lineChartSvg}
      >
        {/* Grid lines */}
        <line
          x1="0"
          y1="40"
          x2="500"
          y2="40"
          stroke="#e5e7eb"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="80"
          x2="500"
          y2="80"
          stroke="#e5e7eb"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="120"
          x2="500"
          y2="120"
          stroke="#e5e7eb"
          strokeWidth="1"
        />

        {/* Line chart paths - 3 lines */}
        <path
          d="M 0,100 C 50,60 70,80 125,75 C 180,70 220,50 250,55 C 280,60 320,65 375,70 C 430,75 470,45 500,40"
          stroke="#cbd5e0"
          strokeWidth="2.5"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M 0,120 C 50,95 70,105 125,100 C 180,95 220,85 250,88 C 280,91 320,92 375,95 C 430,98 470,65 500,60"
          stroke="#94a3b8"
          strokeWidth="2.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 0,110 C 50,80 70,92 125,88 C 180,84 220,72 250,75 C 280,78 320,82 375,85 C 430,88 470,58 500,52"
          stroke="#0a4d4d"
          strokeWidth="3"
          fill="none"
        />
      </svg>

      <div className={styles.lineChartLabels}>
        {days.map((day) => (
          <Text key={day} type="secondary" className={styles.lineChartLabel}>
            {day}
          </Text>
        ))}
      </div>
    </div>
  );
};

export default LineChart;
