"use client";

import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

export function AssistanceCard() {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
    >
      <div className={styles.header}>
        <MessageSquare size={16} strokeWidth={1.5} className={styles.icon} />
        <span className={styles.title}>Need Assistance?</span>
      </div>

      <div className={styles.divider} />

      <p className={styles.description}>
        Polène Customer Service Center is available by phone or via email 24/7.
      </p>

      <div className={styles.actions}>
        <button className={styles.btn} type="button">
          Contact Us by Email
        </button>
        <button className={styles.btn} type="button">
          Chat With Us
        </button>
      </div>
    </motion.div>
  );
}
