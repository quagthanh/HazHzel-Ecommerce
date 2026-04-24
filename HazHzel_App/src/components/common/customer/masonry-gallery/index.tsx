"use client";
import React from "react";
import styles from "./style.module.scss";
import { IMasonryItem } from "@/types/collection";
import MasonryCard from "./masonry-card";
interface Props {
  items: IMasonryItem[];
}
const MasonryGallery = ({ items }: Props) => {
  if (!items || items.length === 0) return null;
  return (
    <div className={styles.masonryWrapper}>
      {items.map((item) => (
        <MasonryCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MasonryGallery;
