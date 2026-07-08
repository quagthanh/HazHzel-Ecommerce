"use client";

import { AlertTriangle, ChevronRight } from "lucide-react";
import styles from "./style.module.scss";

interface LowStockData {
  variantId: string;
  name: string;
  stockLeft: number;
}

interface LowStockAlertProps {
  data?: LowStockData[];
}

const LowStockAlert = ({ data = [] }: LowStockAlertProps) => {
  return (
    <div
      className={styles.card}
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <AlertTriangle size={18} color="#e11d48" />
          <h3
            style={{
              fontSize: "14px",
              fontWeight: 700,
              margin: 0,
              color: "#111827",
            }}
          >
            Low Stock Alerts
          </h3>
        </div>
        <span
          style={{
            backgroundColor: "#ffe4e6",
            color: "#e11d48",
            padding: "2px 8px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {data.length} items
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {data.length === 0 ? (
          <p
            style={{
              fontSize: "13px",
              color: "#6b7280",
              textAlign: "center",
              margin: "10px 0",
            }}
          >
            All inventory levels are good!
          </p>
        ) : (
          data.map((item, index) => (
            <div
              key={item.variantId || index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
              }}
            >
              <div style={{ flex: 1, minWidth: 0, paddingRight: "12px" }}>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#111827",
                    margin: "0 0 4px 0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#e11d48",
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  Only {item.stockLeft} left in stock
                </p>
              </div>
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LowStockAlert;
