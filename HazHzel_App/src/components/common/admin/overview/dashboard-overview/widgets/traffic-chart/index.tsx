"use client";

import { TrendingUp } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./style.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

// Dummy Data
const trafficData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  visitors: [2400, 3200, 2800, 4200, 3800, 5100, 4600],
  pageviews: [4800, 6400, 5600, 8400, 7600, 10200, 9200],
};

const TrafficChart = () => {
  const chartData = {
    labels: trafficData.labels,
    datasets: [
      {
        label: "Visitors",
        data: trafficData.visitors,
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.15)",
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#4f46e5",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2,
      },
      {
        label: "Page Views",
        data: trafficData.pageviews,
        borderColor: "#9ca3af",
        backgroundColor: "transparent",
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#9ca3af",
      },
    ],
  };

  // Cấu hình Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        align: "end" as const,
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          useBorderRadius: true,
          borderRadius: 2,
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
        displayColors: true,
        boxPadding: 4,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
        },
      },
      y: {
        grid: {
          color: "#f3f4f6",
        },
        ticks: {
          color: "#6b7280",
        },
      },
    },
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleBox}>
          <h3>Traffic Analytics</h3>
          <p>Weekly visitor trends</p>
        </div>
        <div className={styles.trendBadge}>
          <TrendingUp size={14} />
          +12.5%
        </div>
      </div>

      <div className={styles.chartContainer}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default TrafficChart;
