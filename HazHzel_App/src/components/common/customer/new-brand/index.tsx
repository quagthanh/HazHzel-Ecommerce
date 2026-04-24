"use client";
import Image from "next/image";
import logo from "@/../public/assets/new_brand_img.webp";
import { INewBrand } from "@/types/interface";

import styles from "@/components/common/customer/new-brand/style.module.scss";
import CustomButton from "@/components/common/customer/public-button";
import Link from "next/link";
const newBrand: INewBrand[] = [
  {
    src: logo,
    href: "/collections/seva-monts",
    label: "Seva Mont",
    description:
      "Seva Mont is a Sydney‑based menswear label reimagining modern style with bold elegance and vintage‑inspired touches. Rooted in purpose, each piece blends quiet confidence with considered details—where relaxed luxury meets tailored street style.",
  },
];
const NewBrand = () => {
  return (
    <>
      {newBrand.map((brand, idx) => (
        <div
          key={`${brand.label}-${idx}`}
          className={`${styles.sectionImgWithText} ${styles.colorSchema} ${styles.imageWrapper}`}
        >
          <div className={styles.imageLeft}>
            <Image
              src={brand.src}
              alt="Seva Mont Logo"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <section className={styles.container}>
            <div className={styles.content}>
              <p className={styles.introducing}>INTRODUCING</p>
              <h1 className={styles.title}>{brand.label}</h1>
              <p className={styles.description}>{brand.description}</p>
              <Link href={brand.href}>
                <CustomButton changeColor>SHOP NOW</CustomButton>
              </Link>
            </div>
          </section>
        </div>
      ))}
    </>
  );
};
export default NewBrand;
