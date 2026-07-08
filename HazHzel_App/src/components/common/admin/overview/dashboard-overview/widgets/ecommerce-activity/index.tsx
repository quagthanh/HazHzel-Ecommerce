"use client";

import { CheckCircle2, User, Star, Lock } from "lucide-react";
import styles from "./style.module.scss";

// Dummy Data
const activityData = [
  {
    id: "act-1",
    title: "New order received",
    description: "Order #7892 - $189.00",
    time: "2 minutes ago",
    theme: "emerald",
    icon: <CheckCircle2 size={16} />,
  },
  {
    id: "act-2",
    title: "New customer registered",
    description: "Sarah Miller joined your store",
    time: "15 minutes ago",
    theme: "blue",
    icon: <User size={16} />,
  },
  {
    id: "act-3",
    title: "New review posted",
    description: "5-star review on Nike Air Max",
    time: "1 hour ago",
    theme: "amber",
    icon: <Star size={16} />,
  },
];

const EcommerceActivity = () => {
  return (
    <div className={`${styles.card} ${styles.disabled}`}>
      <div className={styles.headerTitle}>
        <h3 className={styles.title}>Recent Activity</h3>
        <span className={styles.incomingBadge}>
          <Lock size={12} /> Incoming
        </span>
      </div>
      <div className={styles.timeline}>
        {activityData.map((activity) => (
          <div key={activity.id} className={styles.item}>
            <div className={styles.iconColumn}>
              <div className={`${styles.iconBox} ${styles[activity.theme]}`}>
                {activity.icon}
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.content}>
              <p className={styles.actionTitle}>{activity.title}</p>
              <p className={styles.actionDesc}>{activity.description}</p>
              <p className={styles.time}>{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EcommerceActivity;
