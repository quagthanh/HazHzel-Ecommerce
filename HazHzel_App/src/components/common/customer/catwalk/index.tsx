"use client";
import React, { useState } from "react";
import styles from "./style.module.scss";

const products = [
  {
    id: 1,
    name: "Summer Collection 01",
    price: "1.250.000₫",
    image: "/assets/1cat.png",
    tag: "New",
  },
  {
    id: 2,
    name: "Luxury Silk Dress",
    price: "2.100.000₫",
    image: "/assets/2cat.png",
    tag: "New",
  },
  {
    id: 3,
    name: "Urban Streetwear",
    price: "950.000₫",
    image: "/assets/3cat.png",
    tag: "New",
  },
  {
    id: 4,
    name: "Night Party Outfit",
    price: "1.550.000₫",
    image: "/assets/4cat.png",
    tag: "New",
  },
];

const displayProducts = [...products, ...products];

export default function Catwalk() {
  const [paused, setPaused] = useState(false);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Bộ sưu tập — 2025</p>
        <h2 className={styles.title}>
          The New <em>Arrivals</em>
        </h2>
      </div>

      <div
        className={styles.trackWrapper}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Hai dải màu mờ ảo ở hai đầu dải băng */}
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />

        <div className={`${styles.track} ${paused ? styles.paused : ""}`}>
          {displayProducts.map((product, index) => (
            <div key={`${product.id}-${index}`} className={styles.item}>
              <div className={styles.imgFrame}>
                <span className={styles.tag}>{product.tag}</span>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.img}
                  draggable={false}
                />
                <div className={styles.shadow} />
              </div>

              <div className={styles.info}>
                <span className={styles.name}>{product.name}</span>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{product.price}</span>
                  <button className={styles.btn}>Xem</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
