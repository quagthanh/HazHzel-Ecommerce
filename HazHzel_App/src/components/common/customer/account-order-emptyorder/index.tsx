import styles from "./style.module.scss";

export function EmptyOrders() {
  return (
    <div className={styles.emptyState}>
      <span className={styles.emptyGlyph}>—</span>
      <p className={styles.emptyTitle}>No orders yet</p>
      <p className={styles.emptyText}>
        Your order history will appear here once you&apos;ve made a purchase.
      </p>
      {/* Replace with your Link/Button component */}
      <a href="/stores" className={styles.shopLink}>
        Browse the shop
      </a>
    </div>
  );
}
