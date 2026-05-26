import { Order } from "@/types/account";
import styles from "./style.module.scss";
import { EmptyOrders } from "@/components/common/customer/account-order-emptyorder";
import { OrderEntry } from "@/components/common/customer/account-order-entry";
import { GetMyOrders } from "@/services/order.api";

export default async function OrdersPage() {
  const res = await GetMyOrders();
  const orders: Order[] = res?.data ?? [];
  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Orders</h1>
        <span className={styles.orderCount}>
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </span>
      </header>

      <div className={styles.divider} />

      {orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <ol className={styles.orderList}>
          {orders.map((order, index) => (
            <li key={order._id}>
              <OrderEntry order={order} index={orders.length - index} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
