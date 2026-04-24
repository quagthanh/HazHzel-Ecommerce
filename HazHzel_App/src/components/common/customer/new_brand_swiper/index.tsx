"use client";
import React, { useRef } from "react";
import { Swiper } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./style.module.scss";

const ArrowIcon = ({ direction }: { direction: "prev" | "next" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {direction === "prev" ? (
      <path d="M15 18l-6-6 6-6" />
    ) : (
      <path d="M9 18l6-6-6-6" />
    )}
  </svg>
);

interface NewBrandSwiperProps {
  children: React.ReactNode;
  breakpoints?: any;
  spaceBetween?: number;
}

const NewBrandSwiper = ({
  children,
  breakpoints,
  spaceBetween = 20,
}: NewBrandSwiperProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.swiperWrapper}>
      <button ref={prevRef} className={`${styles.navButton} ${styles.prev}`}>
        <ArrowIcon direction="prev" />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Mousewheel]}
        spaceBetween={spaceBetween}
        slidesPerView={1}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper: any) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={breakpoints}
      >
        {children}
      </Swiper>

      <button ref={nextRef} className={`${styles.navButton} ${styles.next}`}>
        <ArrowIcon direction="next" />
      </button>
    </div>
  );
};

export default NewBrandSwiper;
