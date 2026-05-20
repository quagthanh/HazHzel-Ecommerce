"use client";

import { ReactNode } from "react";
import styles from "./style.module.scss";

interface CustomFieldProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function CustomField({
  label,
  children,
  className = "",
}: CustomFieldProps) {
  return (
    <div className={`${styles.customField} ${className}`}>
      <span className={styles.fieldLabel}>{label}</span>
      <div className={styles.fieldContent}>{children}</div>
    </div>
  );
}
