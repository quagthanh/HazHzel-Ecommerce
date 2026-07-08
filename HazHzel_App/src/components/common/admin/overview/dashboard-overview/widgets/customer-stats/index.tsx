"use client";

import { RefreshCw, UserPlus, DollarSign, Smile } from "lucide-react";
import styles from "./style.module.scss";

interface CustomerStatsProps {
  totalUsers: number;
}

const CustomerStats = ({ totalUsers = 0 }: CustomerStatsProps) => {
  const statsData = [
    {
      id: "repeat",
      label: "Repeat",
      value: "68%",
      icon: <RefreshCw size={16} color="#4f46e5" />,
    },
    {
      id: "new",
      label: "Total Users",
      value: totalUsers.toLocaleString("en-US"),
      icon: <UserPlus size={16} color="#4f46e5" />,
    },
    {
      id: "avg-order",
      label: "Avg Order",
      value: "$127",
      icon: <DollarSign size={16} color="#4f46e5" />,
    },
    {
      id: "satisfaction",
      label: "Satisfaction",
      value: "4.8",
      subValue: "/5",
      icon: <Smile size={16} color="#4f46e5" />,
    },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>Customer Stats</h3>
        <span className={styles.period}>This Month</span>
      </div>

      <div className={styles.statsGrid}>
        {statsData.map((stat) => (
          <div key={stat.id} className={styles.statItem}>
            <div className={styles.itemHeader}>
              {stat.icon}
              <span className={styles.label}>{stat.label}</span>
            </div>
            <p className={styles.value}>
              {stat.value}
              {stat.subValue && (
                <span className={styles.subValue}>{stat.subValue}</span>
              )}
            </p>
          </div>
        ))}
      </div>

      <div className={styles.targetSection}>{/* ... */}</div>
    </div>
  );
};

export default CustomerStats;
