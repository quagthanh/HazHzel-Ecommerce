"use client";

import { useEffect, useState } from "react";
import ProductCard from "../product-card";
import styles from "@/components/common/customer/product-grid/style.module.scss";
import useGridStore from "@/library/stores/useGridStore";
import { IProductGrid } from "@/types/interface";

const ProductGrid = ({ products }: IProductGrid) => {
  const column = useGridStore((state) => state.column);
  const mobileColumn = useGridStore((state) => state.mobileColumn);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className={styles.grid}
      style={{
        gridTemplateColumns: `repeat(${isMobile ? mobileColumn : column},1fr )`,
      }}
    >
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
