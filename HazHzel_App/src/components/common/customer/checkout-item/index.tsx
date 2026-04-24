"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import { useCartStore } from "@/library/stores/useCartStore";

interface OrderItemProps {
  image: any;
  name: string;
  price: string;
  quantity: number;
}

export default function OrderItem({
  image,
  name,
  price,
  quantity,
}: OrderItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.imgWrapper}>
        <Image src={image} alt={name} width={60} height={60} />
        <span className={styles.qty}>{quantity}</span>
      </div>

      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.price}>{price}</p>
      </div>
    </div>
  );
}
