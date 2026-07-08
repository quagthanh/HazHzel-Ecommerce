"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./style.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategorySalesData {
  categoryName: string;
  sales: number;
}

interface CategoryChartProps {
  data?: CategorySalesData[];
}

const CategoryChart = ({ data = [] }: CategoryChartProps) => {
  const backgroundColors = [
    "rgba(79, 70, 229, 0.8)", // Indigo
    "rgba(16, 185, 129, 0.8)", // Emerald
    "rgba(59, 130, 246, 0.8)", // Blue
    "rgba(245, 158, 11, 0.8)", // Amber
    "rgba(244, 63, 94, 0.8)", // Rose
    "rgba(107, 114, 128, 0.8)", // Gray
  ];

  const labels = data.map((item) => item.categoryName);
  const salesData = data.map((item) => item.sales);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: salesData,
        backgroundColor: backgroundColors.slice(0, data.length),
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          color: "#4b5563",
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.raw;
            return ` ${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value)}`;
          },
        },
      },
    },
  };

  return (
    <div
      className={styles.card}
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <h3
          style={{
            fontSize: "14px",
            fontWeight: 700,
            margin: 0,
            color: "#111827",
          }}
        >
          Sales by Category
        </h3>
      </div>
      <div style={{ flex: 1, minHeight: "250px", position: "relative" }}>
        {data.length > 0 ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <p
            style={{ textAlign: "center", color: "#6b7280", marginTop: "50px" }}
          >
            No category data.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryChart;
