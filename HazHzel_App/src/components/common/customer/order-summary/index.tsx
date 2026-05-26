"use client";

import styles from "@/components/common/customer/order-summary/style.module.scss";
import CustomButton from "../public-button";
import OrderItem from "../checkout-item";
import CouponInput from "../checkout-coupon-input";
import SummaryRow from "../checkout-summary-row";
import { useCartStore } from "@/library/stores/useCartStore";
import { useEffect } from "react";
import { Checkout } from "@/services/order.api";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { formatPriceHelper } from "@/utils/helper";

export default function OrderSummary() {
  const { items, fetchCart, getTotalPrice, isLoading, clearCart } =
    useCartStore();
  const router = useRouter();
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);
  const subtotal = getTotalPrice();
  const total = subtotal;

  const handlePayNow = async () => {
    const payload = {
      shippingAddress: {
        name: "Nguyễn Văn A",
        phone: "0987654321",
        street: "123 Đường ABC",
        ward: "Phường 1",
        city: "Hồ Chí Minh",
      },
      paymentMethod: "BANK_TRANSFER",
    };

    try {
      const res = await Checkout(payload);

      console.log("Check API Response:", res);

      if (res?.statusCode === 201) {
        message.success("Your order is successfully created");
        router.push("/");

        setTimeout(() => {
          clearCart();
        }, 100);
      } else {
        message.error("Checkout failed. Please check the console.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API Checkout:", error);
      message.error("Có lỗi xảy ra trong quá trình thanh toán!");
    }
  };
  if (isLoading && items.length === 0) return <div>Loading cart...</div>;
  return (
    <div className={styles.orderSummary}>
      {items.map((item) => (
        <OrderItem
          key={item._id}
          image={item.variantId?.images?.[0]?.secure_url || "/placeholder.webp"}
          name={item.productId?.name}
          price={formatPriceHelper(item.variantId?.currentPrice)}
          quantity={item.quantity}
        />
      ))}

      <CouponInput />

      <SummaryRow
        label={`Subtotal · ${items.length} items`}
        value={formatPriceHelper(subtotal)}
      />

      {/* <SummaryRow label="Shipping" value={formatPrice(shippingFee)} /> */}

      <SummaryRow
        label="Total"
        value={
          <>
            <small>VND</small> {formatPriceHelper(total)}
          </>
        }
        isTotal
      />

      <div className={styles.checkoutBtn}>
        <CustomButton onClick={handlePayNow} disabled={items.length === 0}>
          pay now
        </CustomButton>
      </div>
    </div>
  );
}
