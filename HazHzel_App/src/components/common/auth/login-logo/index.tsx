"use client";
import React from "react";
import styles from "@/components/common/auth/login-logo/style.module.scss";
const LogoLogin = () => {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoSvg}>
        <svg width="150" height="32">
          <circle cx="16" cy="16" r="14" fill="#000000ff" />
          <circle cx="16" cy="16" r="8" fill="#fff" />
          <text x="36" y="22" className={styles.logoText}>
            HazHzel
          </text>
        </svg>
      </div>
    </div>
  );
};

export default LogoLogin;
