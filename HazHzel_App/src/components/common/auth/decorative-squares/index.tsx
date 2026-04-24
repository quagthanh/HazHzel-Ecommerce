import React from "react";
import styles from "@/components/common/auth/decorative-squares/style.module.scss";
const DecorativeSquares = () => {
  return (
    <>
      <div className={styles.textLinesContainer}>
        <div className={`${styles.textLine} ${styles.textLineTopLeft}`}>
          <span className={styles.textContent}>Shop with us</span>
        </div>
        <div className={`${styles.textLine} ${styles.textLineCenterCenter}`}>
          <span className={styles.textContent}>Easy and fast</span>
        </div>
        <div className={`${styles.textLine} ${styles.textLineBottomRight}`}>
          <span className={styles.textContent}>Hazhzel is here</span>
        </div>
      </div>
    </>
  );
};

export default DecorativeSquares;
