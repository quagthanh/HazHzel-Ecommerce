"use client";

import styles from "./style.module.scss";

interface RecentOrdersProps {
  data: any[];
}

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getInitials = (name: string) => {
  if (!name) return "KH";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

const getStatusTheme = (status: string) => {
  const s = status?.toUpperCase() || "";
  if (s === "DELIVERED" || s === "COMPLETED") return "delivered";
  if (s === "SHIPPED") return "shipped";
  if (s === "CANCELLED" || s === "FAILED") return "cancelled";
  return "processing";
};

const RecentOrders = ({ data = [] }: RecentOrdersProps) => {
  console.log("Recent Orders Data:", data);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3>Recent Orders</h3>
          <p>Latest transactions from your store</p>
        </div>
        <a href="/admin/orders" className={styles.viewAll}>
          View All Orders &rarr;
        </a>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!data || data.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No recent orders.
                </td>
              </tr>
            ) : (
              data.map((order) => {
                const customerName =
                  order.shippingAddress?.name || "Guest User";
                const customerPhone =
                  order.shippingAddress?.phone || "No phone";
                const paymentStatus = order.payment?.status || "UNPAID";

                return (
                  <tr key={order._id}>
                    <td className={styles.orderId}>
                      #{order._id.substring(order._id.length - 6).toUpperCase()}
                    </td>

                    <td>
                      <div className={styles.customerCell}>
                        <div className={`${styles.avatar} ${styles.indigo}`}>
                          {getInitials(customerName)}
                        </div>
                        <div className={styles.customerInfo}>
                          <p className={styles.name}>{customerName}</p>
                          <p className={styles.email}>{customerPhone}</p>
                        </div>
                      </div>
                    </td>

                    <td className={styles.dateText}>
                      {formatDate(order.createdAt)}
                    </td>

                    <td className={styles.amountText}>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.totalPrice || 0)}
                    </td>

                    <td>
                      <span
                        className={`${styles.badge} ${
                          paymentStatus === "COMPLETED"
                            ? styles.delivered
                            : styles.processing
                        }`}
                      >
                        {paymentStatus}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`${styles.badge} ${styles[getStatusTheme(order.status)]}`}
                      >
                        {order.status || "PENDING"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
