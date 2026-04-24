"use client";
import Marquee from "react-fast-marquee";
import styles from "@/components/common/customer/marquee-text/style.module.scss";

const MarqueeText = () => {
  const messagesData = [
    "28 day returns",
    "free shipping $99 +",
    "buy now pay later",
  ];
  return (
    <Marquee autoFill className={styles.marqueeText}>
      {messagesData.map((text, idx) => (
        <span key={`${text}-${idx}`} className={styles.scrollingContent}>
          {text}
        </span>
      ))}
    </Marquee>
  );
};
export default MarqueeText;
