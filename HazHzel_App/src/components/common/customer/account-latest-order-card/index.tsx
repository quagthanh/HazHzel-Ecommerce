"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Order } from "@/types/account/index";
import styles from "./style.module.scss";

interface LatestOrderCardProps {
  order: Order | null;
}

export function LatestOrderCard({ order }: LatestOrderCardProps) {
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

      {order ? (
        <div className={styles.orderInfo}>
          <p className={styles.orderId}>Order #{order.id}</p>
          <p className={styles.orderDate}>{order.date}</p>
          <p className={styles.orderStatus}>{order.status}</p>
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
