"use client";

import { CreditCard, CircleDollarSign, Landmark, Wallet } from "lucide-react";
import styles from "./style.module.scss";

interface PaymentMethodData {
  method: string;
  revenue: number;
  transactions: number;
}

interface PaymentMethodsProps {
  data?: PaymentMethodData[];
}

const PaymentMethods = ({ data = [] }: PaymentMethodsProps) => {
  const getMethodConfig = (method: string) => {
    const m = method?.toUpperCase() || "";
    if (m.includes("BANK"))
      return {
        name: "Bank Transfer",
        theme: "bank",
        icon: <Landmark size={20} />,
      };
    if (m.includes("COD") || m.includes("CASH"))
      return {
        name: "Cash on Delivery",
        theme: "paypal",
        icon: <CircleDollarSign size={20} />,
      };
    if (m.includes("VN") || m.includes("VNPAY"))
      return {
        name: "VNPay",
        theme: "creditCard",
        icon: <CreditCard size={20} />,
      };
    return {
      name: method || "Other",
      theme: "applePay",
      icon: <Wallet size={20} />,
    };
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>Payment Methods</h3>
        <span className={styles.period}>Selected Period</span>
      </div>

      <div className={styles.list}>
        {!data || data.length === 0 ? (
          <p
            style={{ textAlign: "center", color: "#6b7280", padding: "10px 0" }}
          >
            No data available.
          </p>
        ) : (
          data.map((item, index) => {
            const config = getMethodConfig(item.method);
            return (
              <div key={index} className={styles.item}>
                <div className={`${styles.iconBox} ${styles[config.theme]}`}>
                  {config.icon}
                </div>

                <div className={styles.content}>
                  <p className={styles.name}>{config.name}</p>
                  <p className={styles.desc}>
                    {item.transactions} transactions
                  </p>
                </div>

                <span className={styles.amount}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.revenue)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;
