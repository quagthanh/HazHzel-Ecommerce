"use client";
import Image, { StaticImageData } from "next/image";
import BreadcrumbPublic from "../breadcrumb";
import styles from "@/components/common/customer/title-center/style.module.scss";
const TitleHeaderCenter = ({
  banner,
  title,
}: {
  banner: StaticImageData;
  title?: string;
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.breadcrumb}>
        <BreadcrumbPublic />
      </div>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};
export default TitleHeaderCenter;
