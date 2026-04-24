"use client";

import styles from "@/components/common/customer/product-detail-info/style.module.scss";
import SizeSelector from "../size-selection";
import PaymentOptions from "../payment-option";
import ProductDetailsTabs from "../product-detail-tabs";
import CustomButton from "@/components/common/customer/public-button";
import { IProductDetail, IProductVariant } from "@/types/interface";
import { useState } from "react";
import { message } from "antd";

interface ProductInfoProps {
  product: IProductDetail;
  currentVariant: IProductVariant | null;
  uniqueAttributes: { name: string; values: string[] }[];
  selectedOptions: Record<string, string>;
  onOptionChange: (key: string, value: string) => void;
  isOptionDisabled?: (key: string, value: string) => boolean;
  onAddToCart: (variantId: string, quantity: number) => Promise<void>;
}

const ProductInfo = ({
  product,
  currentVariant,
  uniqueAttributes,
  selectedOptions,
  onOptionChange,
  isOptionDisabled,
  onAddToCart,
}: ProductInfoProps) => {
  const [loading, setLoading] = useState(false);
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const price = currentVariant
    ? currentVariant.currentPrice
    : product.currentPrice || 0;
  const stock = currentVariant ? currentVariant.stock : 0;
  const handleAddToCartClick = async () => {
    if (!currentVariant) {
      message.error("Please select options");
      return;
    }

    setLoading(true);
    try {
      await onAddToCart(currentVariant._id, 1);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.productInfo}>
      <h2>{product.supplierId?.name || "BRAND"}</h2>
      <h1>{product.name}</h1>

      <p className={styles.price}>{formatPrice(price)}</p>

      {currentVariant ? (
        stock > 0 ? (
          <p className={styles.stock} style={{ color: "green" }}>
            In Stock ({stock} units)
          </p>
        ) : (
          <p className={styles.stock} style={{ color: "red" }}>
            Out of stock
          </p>
        )
      ) : (
        <p className={styles.stock} style={{ color: "#999" }}>
          Please select options
        </p>
      )}

      {uniqueAttributes.map((attr) => (
        <SizeSelector
          key={attr.name}
          label={attr.name}
          options={attr.values}
          selected={selectedOptions[attr.name]}
          onChange={(val) => onOptionChange(attr.name, val)}
          checkDisabled={(val) =>
            isOptionDisabled ? isOptionDisabled(attr.name, val) : false
          }
        />
      ))}

      <CustomButton
        disabled={!currentVariant || stock === 0}
        onClick={handleAddToCartClick}
      >
        {loading ? "ADDING..." : stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
      </CustomButton>

      <PaymentOptions />

      <ul className={styles.benefits}>
        <li>Free Shipping over $99</li>
        <li>Easy 28 day returns</li>
      </ul>

      <ProductDetailsTabs description={product.description} />
    </div>
  );
};

export default ProductInfo;
