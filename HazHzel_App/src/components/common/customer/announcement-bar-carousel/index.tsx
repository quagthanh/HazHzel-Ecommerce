"use client";

import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from "react";
import styles from "@/components/common/customer/announcement-bar-carousel/style.module.scss";
interface Props {
  messages: string[];
}
const AnnouncementBar = ({ messages }: Props) => {
  const carouselRef = useRef<any>(null);
  const handlePrev = () => {
    carouselRef.current?.prev();
  };
  const handleNext = () => {
    carouselRef.current?.next();
  };
  return (
    <div className={styles.announcementBar}>
      <button onClick={handlePrev} className={styles.navButton}>
        <LeftOutlined />
      </button>

      <Carousel
        autoplay
        autoplaySpeed={5000}
        dots={false}
        effect="fade"
        ref={carouselRef}
        className={styles.carousel}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <p className={styles.carouselText}>{msg}</p>
          </div>
        ))}
      </Carousel>

      <button onClick={handleNext} className={styles.navButton}>
        <RightOutlined />
      </button>
    </div>
  );
};

export default AnnouncementBar;
