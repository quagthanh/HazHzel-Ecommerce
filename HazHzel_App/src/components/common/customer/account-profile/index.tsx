"use client";

import { motion } from "framer-motion";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileForm } from "./ProfileForm";
import type { UserProfile } from "@/types/account";
import styles from "./style.module.scss";

interface ProfileContentProps {
  initialData: UserProfile;
}

export function ProfileContent({ initialData }: ProfileContentProps) {
  return (
    <motion.div
      className={styles.profileContainer}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ProfileHeader />
      <ProfileForm initialData={initialData} />
    </motion.div>
  );
}
