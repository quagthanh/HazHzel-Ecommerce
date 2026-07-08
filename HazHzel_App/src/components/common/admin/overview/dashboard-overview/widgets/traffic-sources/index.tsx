"use client";

import { Search, Camera, Link, Mail, Lock } from "lucide-react";
import styles from "./style.module.scss";

// Dummy Data
const trafficData = [
  {
    id: "organic",
    label: "Organic Search",
    percent: "42%",
    theme: "blue",
    icon: <Search size={16} />,
  },
  {
    id: "social",
    label: "Social Media",
    percent: "28%",
    theme: "gradient",
    icon: <Camera size={16} />,
  },
  {
    id: "direct",
    label: "Direct Traffic",
    percent: "18%",
    theme: "emerald",
    icon: <Link size={16} />,
  },
  {
    id: "email",
    label: "Email Campaigns",
    percent: "12%",
    theme: "violet",
    icon: <Mail size={16} />,
  },
];

const TrafficSources = () => {
  return (
    <div className={`${styles.card} ${styles.disabled}`}>
      <div className={styles.headerTitle}>
        <h3 className={styles.title}>Traffic Sources</h3>
        <span className={styles.incomingBadge}>
          <Lock size={12} /> Incoming
        </span>
      </div>
      <div className={styles.list}>
        {trafficData.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.header}>
              <div className={styles.labelInfo}>
                <span className={`${styles.icon} ${styles[item.theme]}`}>
                  {item.icon}
                </span>
                <span className={styles.text}>{item.label}</span>
              </div>
              <span className={styles.percent}>{item.percent}</span>
            </div>

            <div className={styles.progressTrack}>
              <div
                className={`${styles.progressFill} ${styles[item.theme]}`}
                style={{ width: item.percent }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficSources;
