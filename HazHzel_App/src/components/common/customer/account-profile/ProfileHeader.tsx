"use client";

import { User } from "lucide-react";
import styles from "./style.module.scss";

export function ProfileHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.titleWrapper}>
        <User size={20} strokeWidth={1} className={styles.icon} />
        <h1 className={styles.title}>Your Profile</h1>
      </div>
      <div className={styles.divider} />
    </div>
  );
}
