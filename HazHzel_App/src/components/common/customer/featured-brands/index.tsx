// KHÔNG DÙNG "use client" NỮA (trừ khi CustomButton bắt buộc dùng)
import styles from "@/components/common/customer/featured-brands/style.module.scss";
import Link from "next/link";
import CustomButton from "@/components/common/customer/public-button";
import { TopSupplier } from "@/types/interface";
import AppImage from "@/components/common/image/image";

interface FeaturedBrandsProps {
  brands: TopSupplier[];
}

const FeaturedBrands = ({ brands }: FeaturedBrandsProps) => {
  if (!brands || brands.length === 0) return null;

  return (
    <section id="featured-brands">
      <div className={styles.colorSchema}>
        <div className={styles.sectionStack}>
          <div className={`${styles.collectionListTextOutSide} ${styles.wrap}`}>
            {brands.map((item) => {
              const supplier = item.supplier;
              const image = supplier.images?.[0];

              return (
                <Link
                  href={`/stores/${supplier.slug}`}
                  key={item.supplierId}
                  className={styles.collectionCard}
                >
                  <div className={styles.contentOverMedia}>
                    <AppImage
                      src={image?.secure_url}
                      alt={supplier.name}
                      className={styles.zoomImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className={styles.cardContent}>
                    <h3>{supplier.name}</h3>
                    <CustomButton>SHOP</CustomButton>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
