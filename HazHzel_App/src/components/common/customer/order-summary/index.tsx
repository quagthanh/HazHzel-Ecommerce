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

interface Address {
  name: string;
  phone: string;
  street: string;
  ward: string;
  city: string;
}

interface OrderSummaryProps {
  selectedAddress: Address | null;
}

export default function OrderSummary({ selectedAddress }: OrderSummaryProps) {
  const { items, fetchCart, getTotalPrice, isLoading } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const subtotal = getTotalPrice();
  const total = subtotal;

  const handlePayNow = async () => {
    if (
      !selectedAddress ||
      !selectedAddress.name ||
      !selectedAddress.phone ||
      !selectedAddress.street ||
      !selectedAddress.ward ||
      !selectedAddress.city
    ) {
      message.warning("Please fill in all shipping address fields.");
      return;
    }

    const payload = {
      shippingAddress: {
        name: selectedAddress.name,
        phone: selectedAddress.phone,
        street: selectedAddress.street,
        ward: selectedAddress.ward,
        city: selectedAddress.city,
      },
      paymentMethod: "BANK_TRANSFER",
    };

    try {
      const res = await Checkout(payload);

      if (res?.statusCode === 201) {
        message.success("Your order is successfully created");
        router.push("/?checkout_success=true");
      } else {
        message.error("Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      message.error("An error occurred during checkout.");
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

      {/* YÊU CẦU 2: Wrapper cho Sticky Bottom Bar */}
      <div className={styles.stickyBottomBar}>
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
          <CustomButton onClick={handlePayNow}>pay now</CustomButton>
        </div>
      </div>
    </div>
  );
}
