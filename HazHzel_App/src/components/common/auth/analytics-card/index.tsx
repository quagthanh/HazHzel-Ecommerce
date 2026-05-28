import React from "react";
import styles from "@/components/common/auth/analytics-card/style.module.scss";

const AnalyticsCard = () => {
  return (
    <div className={styles.videoWrapper}>
      <video autoPlay muted loop playsInline className={styles.videoBg}>
        <source src="/videos/intro_web.webm" type="video/webm" />
      </video>

      <video autoPlay muted loop playsInline className={styles.video}>
        <source src="/videos/intro_web.webm" type="video/webm" />
      </video>
    </div>
  );
};

export default AnalyticsCard;
