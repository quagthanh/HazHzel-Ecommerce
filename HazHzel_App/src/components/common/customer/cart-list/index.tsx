"use client";

import { Table, InputNumber, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import styles from "../cart/style.module.scss";
import { useCartStore } from "@/library/stores/useCartStore";
import { getAttr } from "@/utils/helper";
import { useState } from "react";

const CartList = () => {
  const { items, isLoading, updateQuantity, removeItem } = useCartStore();
  const [tempQty, setTempQty] = useState<{ [key: string]: number }>({});
  const columns = [
    {
      title: "PRODUCT",
      dataIndex: "product",
      key: "product",
      width: "45%",
      render: (_: any, record: any) => {
        return (
          <div className={styles.productCell}>
            <div className={styles.imageWrapper}>
              <Image
                src={record?.variantId?.images[0].secure_url}
                alt={record?.variantId?.name}
                width={100}
                height={140}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.productMeta}>
              <Link href="#" className={styles.brand}>
                {record.productId?.supplierId?.name}
              </Link>
              <Link href="#" className={styles.name}>
                {record?.variantId?.name}
              </Link>
              <span className={styles.priceMobile}>
                {record?.variantId?.currentPrice?.toLocaleString("vi-VN") || 0}đ
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: "ATRIBUTE",
      dataIndex: "atribute",
      key: "atribute",
      width: "15%",
      responsive: ["md"] as any,
      render: (_: any, record: any) => {
        const size = getAttr(record?.variantId?.attributes, "Size");
        const color = getAttr(record?.variantId?.attributes, "Color");
        return (
          <>
            <span className={styles.size}>Size: {size}</span>
            <span className={styles.size}>Color: {color}</span>
          </>
        );
      },
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      width: "15%",
      responsive: ["md"] as any,
      render: (_: any, record: any) => (
        <span className={styles.priceText}>
          {record?.variantId?.currentPrice?.toLocaleString("vi-VN") || 0}đ
        </span>
      ),
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      width: "25%",
      render: (_: any, record: any) => {
        return (
          <div className={styles.quantityWrapper}>
            <InputNumber
              min={1}
              max={record?.variantId?.stock}
              value={tempQty[record._id] ?? record.quantity}
              onChange={(val) => {
                if (val) {
                  setTempQty((prev) => ({
                    ...prev,
                    [record._id]: val,
                  }));
                }
              }}
              onPressEnter={(e) => {
                const value = Number((e.target as HTMLInputElement).value);
                updateQuantity(record._id, value);
              }}
              onStep={(value) => {
                updateQuantity(record._id, value);
              }}
              className={styles.inputNumber}
            />
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => removeItem(record._id)}
              className={styles.removeBtn}
            >
              Remove
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className={styles.cartListContainer}>
      <Table
        columns={columns}
        dataSource={items}
        pagination={false}
        rowKey="_id"
        loading={isLoading}
        className={styles.customTable}
      />
    </div>
  );
};

export default CartList;
