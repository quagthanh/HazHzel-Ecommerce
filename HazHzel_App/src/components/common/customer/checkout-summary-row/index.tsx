"use client";
import styles from "@/components/common/customer/checkout-summary-row/style.module.scss";
interface SummaryRowProps {
  label: React.ReactNode;
  value: React.ReactNode;
  isTotal?: boolean;
}

export default function SummaryRow({ label, value, isTotal }: SummaryRowProps) {
  return (
    <div className={`${styles.summaryRow} ${isTotal ? styles.totalRow : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
