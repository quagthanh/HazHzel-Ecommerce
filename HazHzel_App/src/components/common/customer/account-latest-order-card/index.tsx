"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Order } from "@/types/account/index";
import styles from "./style.module.scss";

interface LatestOrderCardProps {
  order: Order[];
}

export function LatestOrderCard({ order }: LatestOrderCardProps) {
  const latestOrder = order[0];
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
    >
      <div className={styles.header}>
        <ShoppingBag size={16} strokeWidth={1.5} className={styles.icon} />
        <span className={styles.title}>Your latest order</span>
      </div>

      <div className={styles.divider} />

      {latestOrder ? (
        <div className={styles.orderInfo}>
          <p className={styles.orderId}>Order #{latestOrder._id}</p>
          <p className={styles.orderDate}>
            {new Date(latestOrder.createdAt).toLocaleDateString("vi-VN")}
          </p>
          <p className={styles.orderStatus}>{latestOrder.status}</p>
        </div>
      ) : (
        <p className={styles.emptyText}>You don&apos;t have any order yet.</p>
      )}

      <Link href="/products" className={styles.actionBtn}>
        Explore Our Products
      </Link>
    </motion.div>
  );
}
