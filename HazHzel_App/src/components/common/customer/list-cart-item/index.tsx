"use client";
import styles from "@/components/common/customer/list-cart-item/style.module.scss";
import Image from "next/image";
import { useCartStore } from "@/library/stores/useCartStore";
import { useEffect, useState } from "react";
import { CartItemSkeleton } from "../skeleton/cart";
import { Empty } from "antd";

interface CartItemProps {
  layout?: "vertical" | "two-column";
}

const CartItem = ({ layout = "vertical" }: CartItemProps) => {
  const { items, fetchCart, isLoading, updateQuantity, removeItem } =
    useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);
  if (isLoading && items.length === 0) {
    return (
      <>
        {[1, 2, 3].map((key) => (
          <CartItemSkeleton key={key} layout={layout} />
        ))}
      </>
    );
  }
  if (!isLoading && (!items || items.length == 0)) {
    return (
      <>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Your cart is currently empty."
        />
      </>
    );
  }
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <>
      {items.map((item) => {
        const product = item.productId;
        const variant = item.variantId;

        return (
          <div
            key={item._id}
            className={`${styles.cartItem} ${layout === "two-column" ? styles.twoColumn : ""}`}
          >
            <div className={styles.cartImgWrapper}>
              <Image
                width={120}
                height={180}
                src={variant?.images?.[0]?.secure_url}
                alt={variant?.name}
              />
            </div>

            <div className={styles.productInfo}>
              <span className={styles.category}>
                {product?.supplierId?.name || "NAN"}
              </span>
              <h4 className={styles.productName}>{variant?.name}</h4>
              <p className={styles.price}>
                {formatPrice(variant?.currentPrice || "NAN")}
              </p>

              <div className={styles.attributes}>
                {variant?.attributes?.map((attr: any) => (
                  <span key={attr.k}>
                    {attr.k}: {attr.v}{" "}
                  </span>
                ))}
              </div>

              <div className={styles.quantityItem}>
                <div className={styles.quantityControl}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() =>
                      item.quantity > 1 &&
                      updateQuantity(item._id, item.quantity - 1)
                    }
                  >
                    −
                  </button>
                  <span className={styles.qtyValue}>{item.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className={styles.removeLink}
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CartItem;
