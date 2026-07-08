"use client";

import {
  Globe,
  Smartphone,
  Store,
  MessageSquare,
  Calculator,
  Lock,
} from "lucide-react";
import styles from "./style.module.scss";

// Dummy Data
const breakdownData = [
  {
    id: "online-store",
    name: "Online Store",
    amount: "$52,340",
    percent: "65%",
    color: "rgba(79, 70, 229, 1)",
    icon: <Globe size={16} color="#4f46e5" />,
  },
  {
    id: "mobile-app",
    name: "Mobile App",
    amount: "$28,150",
    percent: "35%",
    color: "rgba(79, 70, 229, 0.7)",
    icon: <Smartphone size={16} color="#4f46e5" />,
  },
  {
    id: "marketplace",
    name: "Marketplace",
    amount: "$18,920",
    percent: "23%",
    color: "rgba(79, 70, 229, 0.5)",
    icon: <Store size={16} color="#4f46e5" />,
  },
  {
    id: "social-commerce",
    name: "Social Commerce",
    amount: "$12,450",
    percent: "15%",
    color: "rgba(79, 70, 229, 0.3)",
    icon: <MessageSquare size={16} color="#4f46e5" />,
  },
  {
    id: "retail-pos",
    name: "Retail POS",
    amount: "$8,570",
    percent: "10%",
    color: "rgba(79, 70, 229, 0.2)",
    icon: <Calculator size={16} color="#4f46e5" />,
  },
];

const RevenueBreakdown = () => {
  return (
    <div className={`${styles.card} ${styles.disabled}`}>
      {/* Header */}
      <div className={styles.header}>
        <h3>Revenue Breakdown</h3>
        <span className={styles.incomingBadge}>
          <Lock size={12} /> Incoming
        </span>
      </div>

      <div className={styles.list}>
        {breakdownData.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.iconBox}>{item.icon}</div>
            <div className={styles.content}>
              <div className={styles.info}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.amount}>{item.amount}</span>
              </div>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: item.percent,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <span className={styles.label}>Total Revenue</span>
        <span className={styles.total}>$120,430</span>
      </div>
    </div>
  );
};

export default RevenueBreakdown;
