"use client";

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

interface SalesChartProps {
  data?: {
    date: string;
    revenue: number;
    orders: number;
  }[];
}

const SalesChart = ({ data = [] }: SalesChartProps) => {
  const labels = data.map((item) => {
    const date = new Date(item.date);
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  });

  const revenueData = data.map((item) => item.revenue);
  const ordersData = data.map((item) => item.orders);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue (VND)",
        data: revenueData,
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.15)",
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        yAxisID: "y",
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#4f46e5",
      },
      {
        label: "Orders",
        data: ordersData,
        borderColor: "#10b981",
        backgroundColor: "transparent",
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        yAxisID: "y1",
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#10b981",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
    plugins: {
      legend: { position: "top" as const, align: "end" as const },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#ffffff",
        bodyColor: "#d1d5db",
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) label += ": ";
            if (context.datasetIndex === 0) {
              label += new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(context.parsed.y);
            } else {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280" },
      },
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        grid: { color: "#f3f4f6" },
        ticks: {
          color: "#6b7280",
          callback: (value: any) => {
            return value >= 1000000
              ? `${(value / 1000000).toFixed(0)}M`
              : value;
          },
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: { drawOnChartArea: false },
        ticks: { color: "#10b981" },
      },
    },
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleBox}>
          <h3>Sales Overview</h3>
          <p>Revenue and orders over time</p>
        </div>
      </div>
      <div className={styles.chartContainer}>
        {data.length > 0 ? (
          <Line data={chartData} options={chartOptions as any} />
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9ca3af",
            }}
          >
            No sales data available.
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesChart;
