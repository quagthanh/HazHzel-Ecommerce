import Link from "next/link";
import styles from "./style.module.scss";

export function EmptyOrders() {
  return (
    <div className={styles.emptyState}>
      <span className={styles.emptyGlyph}>—</span>
      <p className={styles.emptyTitle}>No orders yet</p>
      <p className={styles.emptyText}>
        Your order history will appear here once you&apos;ve made a purchase.
      </p>

      <Link href="/stores" className={styles.shopLink}>
        Browse the shop
      </Link>
    </div>
  );
}
