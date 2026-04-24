"use client";
import unisex_men from "@/../public/assets/unisex_collection_men_test.jpg";
import unisex_women from "@/../public/assets/unisex_collection_women_test.jpg";
import Image from "next/image";
import styles from "@/components/common/customer/unisex-collections/style.module.scss";
import Link from "next/link";
import { UnisexItem } from "@/types/interface";
const UnisexCollections = () => {
  const collections: UnisexItem[] = [
    {
      href: "/products?gender=women",
      label: "Women",
      image: [
        {
          href: "#",
          src: unisex_women,
          data_title: "kore studios",
          subtitle: "Euro Summer Vibes",
          width: 800,
          height: 672,
        },
      ],
    },
    {
      href: "/products?gender=men",
      label: "Men",
      image: [
        {
          href: "#",
          src: unisex_men,
          data_title: "kore studios",
          subtitle: "Euro Summer Vibes",
          width: 800,
          height: 672,
        },
      ],
    },
  ];
  return (
    <section id="unisex-collections">
      <div className={styles.sectionSpacing}>
        <div className={styles.container}>
          <div className={styles.sectionStack}>
            <div className={`${styles.collectionList} ${styles.wrap}`}>
              {collections.map((collection, idx) => (
                <Link
                  href={collection.href}
                  key={`${collection.href}-${idx}`}
                  className={styles.collectionCard}
                >
                  <div className={styles.contentOverMedia}>
                    <Image
                      src={collection.image[0].src}
                      alt="img unisexcollection"
                      width={800}
                      height={672}
                      className={styles.zoomImage}
                      draggable={false}
                    />
                    <div className={styles.cardContent}>
                      <h3>{collection.label}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default UnisexCollections;
