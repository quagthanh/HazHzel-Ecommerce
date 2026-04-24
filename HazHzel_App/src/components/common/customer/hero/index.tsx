"use client";
import Image from "next/image";
import bannerDesktop from "@/../public/assets/banner_buy1_get1.webp";
import bannerMobile from "@/../public/assets/buy_1_get_1_responsive.webp";
import styles from "@/components/common/customer/hero/style.module.scss";
import { useBreakpoint } from "@/utils/hooks/ueBreakpoint";
const HeroPublic = () => {
  const isMobile = useBreakpoint(450);
  return (
    <section className={styles.container}>
      <Image
        src={isMobile ? bannerMobile : bannerDesktop}
        alt="buy 1 get 1 banner"
        width={1920}
        height={500}
        className={styles.bannerImage}
      ></Image>
    </section>
  );
};
export default HeroPublic;
