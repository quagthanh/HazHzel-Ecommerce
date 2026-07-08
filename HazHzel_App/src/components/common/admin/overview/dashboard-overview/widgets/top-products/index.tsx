"use client";

import { ShoppingBag, Watch, Headphones, Briefcase, Shirt } from "lucide-react";
import styles from "./style.module.scss";

// Dummy Data
const topProductsData = [
  {
    id: "prod-1",
    name: "Nike Air Max 270",
    sold: "892",
    price: "$12,450",
    trend: "+18%",
    isPositive: true,
    icon: <ShoppingBag size={20} color="#4f46e5" />,
    bgColor: "rgba(79, 70, 229, 0.1)", // primary/10
  },
  {
    id: "prod-2",
    name: "Apple Watch Series 9",
    sold: "654",
    price: "$9,823",
    trend: "+12%",
    isPositive: true,
    icon: <Watch size={20} color="#3b82f6" />,
    bgColor: "rgba(59, 130, 246, 0.1)", // blue-500/10
  },
  {
    id: "prod-3",
    name: "Sony WH-1000XM5",
    sold: "521",
    price: "$8,156",
    trend: "+9%",
    isPositive: true,
    icon: <Headphones size={20} color="#f43f5e" />,
    bgColor: "rgba(244, 63, 94, 0.1)", // rose-500/10
  },
  {
    id: "prod-4",
    name: "Coach Leather Bag",
    sold: "412",
    price: "$7,290",
    trend: "-3%",
    isPositive: false,
    icon: <Briefcase size={20} color="#f59e0b" />,
    bgColor: "rgba(245, 158, 11, 0.1)", // amber-500/10
  },
  {
    id: "prod-5",
    name: "North Face Jacket",
    sold: "389",
    price: "$6,845",
    trend: "+22%",
    isPositive: true,
    icon: <Shirt size={20} color="#10b981" />,
    bgColor: "rgba(16, 185, 129, 0.1)", // emerald-500/10
  },
];
interface TopProductData {
  productId: string;
  name: string;
  image: string;
  totalSold: number;
  revenue: number;
}

interface TopProductsProps {
  data?: TopProductData[];
}
const TopProducts = ({ data = [] }: TopProductsProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>Top Products</h3>
        <span className={styles.subtitle}>By volume</span>
      </div>

      <div className={styles.list}>
        {!data || data.length === 0 ? (
          <p
            style={{ textAlign: "center", color: "#6b7280", padding: "20px 0" }}
          >
            No data available.
          </p>
        ) : (
          data.map((product, index) => (
            <div key={product.productId || index} className={styles.item}>
              <div className={styles.productInfo}>
                <img
                  src={product.image || "/placeholder-image.jpg"}
                  alt={product.name}
                  className={styles.image}
                />
                <div className={styles.details}>
                  <p className={styles.name}>{product.name}</p>
                  <p className={styles.category}>{product.totalSold} sold</p>
                </div>
              </div>
              <div className={styles.stats}>
                <span className={styles.price}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.revenue)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopProducts;
