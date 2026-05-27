import { OrderItem } from "@/types/account";
import styles from "./style.module.scss";
import Image from "next/image";

interface OrderItemRowProps {
  item: OrderItem;
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function OrderItemRow({ item }: OrderItemRowProps) {
  console.log("Check image from oder item:", item);
  return (
    <div className={styles.itemRow}>
      <div className={styles.itemImageWrap}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="56px"
            className={styles.itemImage}
          />
        ) : (
          <div className={styles.itemImagePlaceholder} aria-hidden="true" />
        )}
      </div>

      <div className={styles.itemInfo}>
        <span className={styles.itemName}>{item.name}</span>
        <span className={styles.itemQty}>× {item.quantity}</span>
      </div>

      <span className={styles.itemPrice}>
        {formatPrice(item.price * item.quantity)}
      </span>
    </div>
  );
}
