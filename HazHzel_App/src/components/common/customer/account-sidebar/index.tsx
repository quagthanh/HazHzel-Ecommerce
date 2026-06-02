"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer } from "antd";
import {
  LayoutDashboard,
  ShoppingBag,
  User,
  MapPin,
  Heart,
  Bell,
  MessageSquare,
  LogOut,
  Menu,
  ChevronDown,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeItem =
    NAV_ITEMS.find((item) => item.href === pathname) || NAV_ITEMS[0];

  const renderNavItems = (isMobile: boolean = false) => (
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
              <div
                className={`${styles.disabledLink} ${
                  isMobile ? styles.mobileNavItem : ""
                }`}
              >
                <Icon
                  size={isMobile ? 18 : 14}
                  strokeWidth={1.5}
                  className={styles.icon}
                />
                <span>{label}</span>
                <span className={styles.badge}>Coming Soon</span>
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
              onClick={() => isMobile && setMobileMenuOpen(false)}
              className={`${styles.navLink} ${isActive ? styles.active : ""} ${
                isMobile ? styles.mobileNavItem : ""
              }`}
            >
              <Icon
                size={isMobile ? 18 : 14}
                strokeWidth={1.5}
                className={styles.icon}
              />
              <span>{label}</span>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );

  return (
    <aside className={styles.sidebar}>
      {/* Mobile Trigger Button */}
      <div className={styles.mobileTriggerWrapper}>
        <button
          className={styles.mobileTriggerBtn}
          onClick={() => setMobileMenuOpen(true)}
        >
          <div className={styles.triggerContent}>
            <ChevronDown size={18} strokeWidth={1.5} className={styles.icon} />
            <span>Menu / {activeItem.label}</span>
          </div>
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className={styles.desktopNav}>
        <p className={styles.heading}>My Account</p>
        <nav className={styles.nav}>
          {renderNavItems()}
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
      </div>

      {/* Mobile Drawer Navigation */}
      <Drawer
        title="MY ACCOUNT"
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={300}
      >
        <nav className={styles.nav}>
          {renderNavItems(true)}
          <div className={styles.divider} />
          <button
            onClick={() => signOut()}
            className={`${styles.logoutBtn} ${styles.mobileNavItem}`}
            type="button"
          >
            <LogOut size={18} strokeWidth={1.5} className={styles.icon} />
            <span>Log Out</span>
          </button>
        </nav>
      </Drawer>
    </aside>
  );
}
