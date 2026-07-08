"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./style.module.scss";
import { Lock } from "lucide-react";
ChartJS.register(ArcElement, Tooltip, Legend);

const distributionData = {
  labels: ["Direct", "Organic", "Referral", "Social"],
  values: [35, 28, 22, 15],
};

const DistributionChart = () => {
  const chartData = {
    labels: distributionData.labels,
    datasets: [
      {
        data: distributionData.values,
        backgroundColor: [
          "rgba(79, 70, 229, 1)", // Direct
          "rgba(79, 70, 229, 0.7)", // Organic
          "rgba(79, 70, 229, 0.4)", // Referral
          "rgba(79, 70, 229, 0.2)", // Social
        ],
        borderColor: "#ffffff",
        borderWidth: 3,
        hoverBorderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          useBorderRadius: true,
          borderRadius: 2,
          padding: 16,
          color: "#6b7280",
          font: { size: 11 },
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#ffffff",
        bodyColor: "#d1d5db",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function (context: any) {
            return ` ${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };

  return (
    <div className={`${styles.card} ${styles.disabled}`}>
      <div className={styles.header}>
        <div>
          <h3>Sales Distribution</h3>
          <p>Traffic sources breakdown</p>
        </div>
        <span className={styles.incomingBadge}>
          <Lock size={12} /> Incoming
        </span>
      </div>
      <div className={styles.chartContainer}>
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      <div className={styles.footer}>
        <div className={styles.statsGrid}>
          <div>
            <p className={styles.label}>Total Sales</p>
            <p className={styles.value}>$45,231</p>
          </div>
          <div>
            <p className={styles.label}>This Month</p>
            <p className={`${styles.value} ${styles.positive}`}>+18.2%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionChart;
