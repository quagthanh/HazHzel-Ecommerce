"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  User,
  MapPin,
  Heart,
  Bell,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";

import styles from "./style.module.scss";

const NAV_ITEMS = [
  { label: "Overview", href: "/account", icon: LayoutDashboard },
  { label: "Orders", href: "/account/orders", icon: ShoppingBag },
  { label: "Profile", href: "/account/profile", icon: User },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Wishlist", href: "/account/wishlist", icon: Heart, disabled: true },
  {
    label: "Alert Back in Stock",
    href: "/account/alerts",
    icon: Bell,
    disabled: true,
  },
  {
    label: "Assistance",
    href: "/account/assistance",
    icon: MessageSquare,
    disabled: true,
  },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <p className={styles.heading}>My Account</p>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {NAV_ITEMS.map(({ label, href, icon: Icon, disabled }, i) => {
            const isActive = pathname === href;
            if (disabled) {
              return (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <div className={styles.disabledLink}>
                    <Icon size={14} strokeWidth={1.5} className={styles.icon} />
                    <span>{label}</span>

                    <span className={styles.badge}>Comming Soon</span>
                  </div>
                </motion.li>
              );
            }
            return (
              <motion.li
                key={href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <Link
                  href={href}
                  className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                >
                  <Icon size={14} strokeWidth={1.5} className={styles.icon} />
                  <span>{label}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <div className={styles.divider} />

        <button
          onClick={() => signOut()}
          className={styles.logoutBtn}
          type="button"
        >
          <LogOut size={14} strokeWidth={1.5} className={styles.icon} />
          <span>Log Out</span>
        </button>
      </nav>
    </aside>
  );
}
