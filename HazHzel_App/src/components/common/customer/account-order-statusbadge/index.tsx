import { OrderStatus } from "@/types/account";
import styles from "./style.module.scss";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; variant: "outline" | "filled" | "muted" }
> = {
  PENDING: { label: "Pending", variant: "outline" },
  CONFIRMED: { label: "Confirmed", variant: "outline" },
  PROCESSING: { label: "Processing", variant: "outline" },
  SHIPPED: { label: "Shipped", variant: "filled" },
  DELIVERED: { label: "Delivered", variant: "filled" },
  CANCELLED: { label: "Cancelled", variant: "muted" },
  REFUNDED: { label: "Refunded", variant: "muted" },
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? { label: status, variant: "outline" };

  return (
    <span
      className={styles.statusBadge}
      data-variant={config.variant}
      aria-label={`Order status: ${config.label}`}
    >
      {config.label}
    </span>
  );
}
