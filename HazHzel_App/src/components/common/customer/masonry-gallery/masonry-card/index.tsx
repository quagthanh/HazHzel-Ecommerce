"use client";

import React from "react";
import { Card } from "antd";
import Link from "next/link";
import styles from "@/components/common/customer/masonry-gallery/style.module.scss";
import { EntityType, IMasonryItem } from "@/types/collection";
import MasonryImage from "../../masonry-image";

interface Props {
  item: IMasonryItem;
}

const MasonryCard = ({ item }: Props) => {
  const getTagInfo = (type: EntityType) => {
    switch (type) {
      case EntityType.STORE:
        return { text: "Store", className: styles.tagStore };
      case EntityType.COLLECTION:
        return { text: "Collection", className: styles.tagCollection };
      case EntityType.CATEGORY:
        return { text: "Category", className: styles.tagCategory };
      default:
        return { text: "Item", className: styles.tagCategory };
    }
  };

  const tagInfo = getTagInfo(item.type);

  const getLink = () => {
    switch (item.type) {
      case EntityType.STORE:
        return `/stores/${item.slug}`;
      case EntityType.COLLECTION:
        return `/collections/${item.slug}`;
      case EntityType.CATEGORY:
        return `/categories/${item.slug}`;
      default:
        return "#";
    }
  };

  const imgSrc = item.image?.secure_url || (item as any).imageUrl || "";
  const imgWidth = item.image?.width || 500;
  const imgHeight = item.image?.height || 500;

  return (
    <div className={styles.masonryItem}>
      <Link href={getLink()}>
        <Card
          hoverable
          size="small"
          className={styles.masonryCard}
          bordered={false}
          cover={
            <div className={styles.cardImageWrapper}>
              <span className={`${styles.tag} ${tagInfo.className}`}>
                {tagInfo.text}
              </span>

              <MasonryImage
                src={imgSrc}
                alt={item.title}
                width={imgWidth}
                height={imgHeight}
                className={styles.zoomImage}
              />

              <div className={styles.overlay} />

              <div className={styles.titleOverlay}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>
            </div>
          }
        />
      </Link>
    </div>
  );
};

export default MasonryCard;
