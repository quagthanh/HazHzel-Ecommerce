"use client";
import styles from "@/components/common/customer/list-cart-item/style.module.scss";
import Image from "next/image";
import { useCartStore } from "@/library/stores/useCartStore";
import { useEffect } from "react";
import { CartItemSkeleton } from "../skeleton/cart";
import { Empty } from "antd";
import { formatPriceHelper } from "@/utils/helper";

interface CartItemProps {
  layout?: "vertical" | "two-column";
}

const CartItem = ({ layout = "vertical" }: CartItemProps) => {
  const { items, fetchCart, isLoading, updateQuantity, removeItem } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ==========================================
  // GIẢI PHÁP: Sử dụng render có điều kiện tập trung tại khối return chính
  // Không viết câu lệnh "return sớm" ngắt ngang xương ở đây nữa.
  // ==========================================
  return (
    <>
      {/* TRẠNG THÁI 1: ĐANG LOADING */}
      {isLoading && items.length === 0 && (
        <>
          {[1, 2, 3].map((key) => (
            <CartItemSkeleton key={key} layout={layout} />
          ))}
        </>
      )}

      {/* TRẠNG THÁI 2: GIỎ HÀNG TRỐNG */}
      {!isLoading && (!items || items.length === 0) && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Your cart is currently empty."
        />
      )}

      {/* TRẠNG THÁI 3: CÓ SẢN PHẨM (Hiển thị danh sách) */}
      {items.length > 0 &&
        items.map((item) => {
          const product = item.productId;
          const variant = item.variantId;

          return (
            <div
              key={item._id}
              className={`${styles.cartItem} ${layout === "two-column" ? styles.twoColumn : ""}`}
            >
              <div className={styles.cartImgWrapper}>
                {/* Giờ đây thẻ Image này luôn nằm trong cấu trúc render an toàn */}
                <Image
                  width={120}
                  height={180}
                  src={variant?.images?.[0]?.secure_url || "/placeholder.webp"}
                  alt={variant?.name || "Product Image"}
                />
              </div>

              <div className={styles.productInfo}>
                <span className={styles.category}>
                  {product?.supplierId?.name || "NAN"}
                </span>
                <h4 className={styles.productName}>{variant?.name}</h4>
                <p className={styles.price}>
                  {formatPriceHelper(variant?.currentPrice || 0)}
                </p>

                <div className={styles.attributes}>
                  {variant?.attributes
                    ?.map((attr: any) => `${attr.k}: ${attr.v}`)
                    .join(" - ")}
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