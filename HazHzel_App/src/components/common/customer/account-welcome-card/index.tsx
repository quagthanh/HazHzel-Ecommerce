"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import type { AccountUser } from "@/types/account/index";
import styles from "./style.module.scss";

interface WelcomeCardProps {
  user: AccountUser;
}

export function WelcomeCard({ user }: WelcomeCardProps) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* Left: user info */}
      <div className={styles.info}>
        <div className={styles.welcomeRow}>
          <User size={16} strokeWidth={1.5} className={styles.userIcon} />
          <span className={styles.welcomeText}>Welcomes {user.name}</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.contactBlock}>
          <p className={styles.contactItem}>{user.email}</p>
          <p className={styles.contactItem}>{user.phone}</p>
        </div>

        <Link href="/account/profile" className={styles.editBtn}>
          Edit Profile
        </Link>
      </div>

      {/* Right: editorial image */}
      <div className={styles.imageWrapper}>
        <Image
          src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80"
          alt="Polène leather bag editorial"
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 40vw"
          priority
        />
      </div>
    </motion.div>
  );
}
