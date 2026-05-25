import { Order } from "@/types/account";
import styles from "./style.module.scss";
import { EmptyOrders } from "@/components/common/customer/account-order-emptyorder";
import { OrderEntry } from "@/components/common/customer/account-order-entry";
import { GetOrders } from "@/services/order.api";

async function getOrders(): Promise<Order[]> {
  // Replace with your actual API call
  // const res = await fetch(`${process.env.API_URL}/orders`, {
  //   cache: "no-store",
  //   headers: { Authorization: `Bearer ${token}` },
  // });
  // const json = await res.json();
  // return json.data;
  return [];
}

export default async function OrdersPage() {
  const slug = "6928813e6e593e00382bb3df";

  const res = await GetOrders(slug);
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
