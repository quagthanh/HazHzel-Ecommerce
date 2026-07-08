"use client";

import { Package, Check, Clock, Lock } from "lucide-react";
import styles from "./style.module.scss";

// Dummy Data
const shippingStats = [
  { label: "In Transit", value: "247" },
  { label: "Delivered", value: "892" },
  { label: "Pending", value: "12" },
];

const recentShipments = [
  {
    id: "#SH-7892",
    location: "New York, NY",
    status: "In Transit",
    theme: "primary",
    icon: <Package size={16} />,
  },
  {
    id: "#SH-7891",
    location: "Los Angeles, CA",
    status: "Delivered",
    theme: "emerald",
    icon: <Check size={16} />,
  },
  {
    id: "#SH-7890",
    location: "Chicago, IL",
    status: "Pending",
    theme: "amber",
    icon: <Clock size={16} />,
  },
];

const ShippingOverview = () => {
  return (
    <div className={`${styles.card} ${styles.disabled}`}>
      {/* Header */}
      <div className={styles.header}>
        <h3>Shipping Overview</h3>
        <span className={styles.incomingBadge}>
          <Lock size={12} /> Incoming
        </span>
      </div>

      <div className={styles.statsGrid}>
        {shippingStats.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <p className={styles.value}>{stat.value}</p>
            <p className={styles.label}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className={styles.shipmentsList}>
        {recentShipments.map((shipment) => (
          <div key={shipment.id} className={styles.shipmentItem}>
            <div className={styles.shipmentInfo}>
              <div className={`${styles.iconBox} ${styles[shipment.theme]}`}>
                {shipment.icon}
              </div>
              <div className={styles.details}>
                <p className={styles.id}>{shipment.id}</p>
                <p className={styles.location}>{shipment.location}</p>
              </div>
            </div>
            <span className={`${styles.badge} ${styles[shipment.theme]}`}>
              {shipment.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingOverview;
