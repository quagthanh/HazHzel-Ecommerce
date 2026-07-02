"use client";
import { Order } from "@/types/account";
import styles from "./style.module.scss";
import { OrderStatusBadge } from "../account-order-statusbadge";
import { OrderItemRow } from "../account-order-itemrow";

interface OrderEntryProps {
  order: Order;
  index: number;
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}

const PAYMENT_METHOD_LABEL: Record<string, string> = {
  BANK_TRANSFER: "Bank Transfer",
  COD: "Cash on Delivery",
  CREDIT_CARD: "Credit Card",
  MOMO: "MoMo",
};

export function OrderEntry({ order, index }: OrderEntryProps) {
  const shortId = order._id.slice(-8).toUpperCase();

  return (
    <article className={styles.orderEntry}>
      <aside className={styles.entryMeta}>
        <span className={styles.entryIndex}>
          #{String(index).padStart(2, "0")}
        </span>
        <time className={styles.entryDate} dateTime={order.createdAt}>
          {formatDate(order.createdAt)}
        </time>
        <span className={styles.entryId}>{shortId}</span>
      </aside>

      <div className={styles.entryContent}>
        <div className={styles.entryTopRow}>
          <OrderStatusBadge status={order.status} />
          <span className={styles.paymentMethod}>
            {PAYMENT_METHOD_LABEL[order.payment.method] ?? order.payment.method}
          </span>
        </div>

        <div className={styles.itemList}>
          {order.items.map((item) => (
            <OrderItemRow
              key={`${item.variantId}-${item.productId}`}
              item={item}
            />
          ))}
        </div>

        <div className={styles.entryFooter}>
          <div className={styles.shippingInfo}>
            <span className={styles.shippingLabel}>Ship to</span>
            <span className={styles.shippingName}>
              {order.shippingAddress.name}
            </span>
            <span className={styles.shippingAddress}>
              {order.shippingAddress.street}, {order.shippingAddress.ward},{" "}
              {order.shippingAddress.city}
            </span>
          </div>

          <div className={styles.priceSummary}>
            <div className={styles.priceRow}>
              <span>Subtotal</span>
              <span>{formatPrice(order.subTotal)}</span>
            </div>
            <div className={styles.priceRow}>
              <span>Shipping</span>
              <span>{formatPrice(order.shippingCost)}</span>
            </div>
            {order.discount && (
              <div className={styles.priceRow}>
                <span>Discount</span>
                <span>— {order.discount}</span>
              </div>
            )}
            <div className={styles.priceRowTotal}>
              <span>Total</span>
              <span>{formatPrice(order.totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
