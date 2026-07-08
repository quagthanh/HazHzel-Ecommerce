"use client";

import { Row, Col } from "antd";
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip as ChartTooltip,
} from "chart.js";
import styles from "./style.module.scss";

// Đăng ký Tooltip của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTooltip,
);

interface DashboardMetricsProps {
  data?: {
    totalRevenue: number;
    totalOrders: number;
    newCustomers: number;
    averageOrderValue: number;
  };
  chartData?: {
    date: string;
    revenue: number;
    orders: number;
  }[];
}

interface MetricItem {
  id: string;
  title: string;
  value: string;
  trendValue: string;
  isPositive: boolean;
  icon: JSX.Element;
  themeColor: string;
  opacityLevel: string;
  type: string;
  chartPoints: number[];
  progressData?: {
    target: string;
    current: string;
  };
}

const DashboardMetrics = ({ data, chartData = [] }: DashboardMetricsProps) => {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(val || 0);

  const revenuePoints = chartData.map((item) => item.revenue);
  const ordersPoints = chartData.map((item) => item.orders);
  const aovPoints = chartData.map((item) =>
    item.orders > 0 ? item.revenue / item.orders : 0,
  );
  const customerPoints = chartData.map((item) =>
    Math.round(item.orders * 0.3 + (item.revenue % 3)),
  );

  const metrics: MetricItem[] = [
    {
      id: "revenue",
      title: "Total Revenue",
      value: formatCurrency(data?.totalRevenue || 0),
      trendValue: "+12.5%",
      isPositive: true,
      icon: <DollarSign size={20} color="rgb(79, 70, 229)" />,
      themeColor: "rgb(79, 70, 229)",
      opacityLevel: "0.1",
      type: "chart",
      chartPoints:
        revenuePoints.length > 0 ? revenuePoints : [10, 25, 15, 30, 22, 45, 40],
    },
    {
      id: "orders",
      title: "Total Orders",
      value: (data?.totalOrders || 0).toLocaleString("en-US"),
      trendValue: "+8.2%",
      isPositive: true,
      icon: <ShoppingBag size={20} color="rgb(16, 185, 129)" />,
      themeColor: "rgb(16, 185, 129)",
      opacityLevel: "0.1",
      type: "chart",
      chartPoints:
        ordersPoints.length > 0 ? ordersPoints : [5, 12, 8, 15, 10, 22, 18],
    },
    {
      id: "customers",
      title: "New Customers",
      value: (data?.newCustomers || 0).toLocaleString("en-US"),
      trendValue: "+24.3%",
      isPositive: true,
      icon: <Users size={20} color="rgb(59, 130, 246)" />,
      themeColor: "rgb(59, 130, 246)",
      opacityLevel: "0.1",
      type: "chart",
      chartPoints:
        customerPoints.length > 0 ? customerPoints : [2, 6, 4, 9, 5, 12, 10],
    },
    {
      id: "aov",
      title: "Avg. Order Value",
      value: formatCurrency(data?.averageOrderValue || 0),
      trendValue: "-1.5%",
      isPositive: false,
      icon: <Activity size={20} color="rgb(245, 158, 11)" />,
      themeColor: "rgb(245, 158, 11)",
      opacityLevel: "0.1",
      type: "chart",
      chartPoints:
        aovPoints.length > 0 ? aovPoints : [40, 35, 42, 38, 45, 41, 44],
    },
  ];

  const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: {
        top: 40,
        bottom: 5,
        left: 5,
        right: 5,
      },
    },

    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,

        yAlign: "bottom" as const,

        backgroundColor: "#111827",
        titleColor: "#9ca3af",
        titleFont: { size: 11, weight: "normal" as const },
        bodyColor: "#ffffff",
        bodyFont: { size: 12, weight: "bold" as const },
        displayColors: false,
        padding: 10,
        cornerRadius: 8,
        caretPadding: 8,
        bodySpacing: 4,

        callbacks: {
          title: function (context: any) {
            const rawLabel = context[0].label;
            if (!rawLabel || isNaN(Date.parse(rawLabel))) {
              return `Day ${rawLabel}`;
            }
            const date = new Date(rawLabel);
            return date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            });
          },
          label: function (context: any) {
            const value = context.parsed.y;
            const datasetLabel = context.dataset.label || "";
            if (
              datasetLabel.includes("Revenue") ||
              datasetLabel.includes("Value")
            ) {
              const formattedPrice = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(value);
              return `${datasetLabel}: ${formattedPrice}`;
            }
            return `${datasetLabel}: ${new Intl.NumberFormat("vi-VN").format(value)}`;
          },
        },
      },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };
  const getChartData = (points: number[], labelName: string, color: string) => {
    const labels =
      chartData.length > 0
        ? chartData.map((item) => item.date)
        : points.map((_, i) => i.toString());

    return {
      labels: labels,
      datasets: [
        {
          label: labelName,
          data: points,
          borderColor: color,
          borderWidth: 1.5,
          tension: 0.4,
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: color,
        },
      ],
    };
  };

  return (
    <Row gutter={[16, 16]}>
      {metrics.map((metric) => (
        <Col xs={24} sm={12} xl={6} key={metric.id}>
          <div className={styles.metricCard}>
            <div
              className={styles.blob}
              style={{
                background: `linear-gradient(to bottom right, ${metric.themeColor.replace(")", `, ${metric.opacityLevel})`)}, transparent)`,
              }}
            />

            <div className={styles.headerInfo}>
              <div
                className={styles.iconWrapper}
                style={{
                  backgroundColor: metric.themeColor.replace(
                    ")",
                    `, ${metric.opacityLevel})`,
                  ),
                }}
              >
                {metric.icon}
              </div>
              <p className={styles.title}>{metric.title}</p>
            </div>

            <div className={styles.valueContainer}>
              <span className={styles.value}>{metric.value}</span>
              <span
                className={`${styles.badge} ${metric.isPositive ? styles.positive : styles.negative}`}
              >
                {metric.isPositive ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {metric.trendValue}
              </span>
            </div>

            <div
              className={styles.footerArea}
              style={{
                height: "40px",
                marginTop: "12px",
                position: "relative",
              }}
            >
              {metric.type === "progress" && metric.progressData ? (
                <div>
                  <div className={styles.progressHeader}>
                    <span className={styles.target}>
                      Target: {metric.progressData.target}
                    </span>
                    <span className={styles.current}>
                      {metric.progressData.current}
                    </span>
                  </div>
                  <div className={styles.progressTrack}>
                    <div
                      className={styles.progressFill}
                      style={{ width: metric.progressData.current }}
                    />
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    top: "-40px",
                    bottom: "-5px",
                    left: 0,
                    right: 0,
                    zIndex: 10,
                  }}
                >
                  <Line
                    data={getChartData(
                      metric.chartPoints,
                      metric.title,
                      metric.themeColor,
                    )}
                    options={sparklineOptions}
                  />
                </div>
              )}
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardMetrics;
