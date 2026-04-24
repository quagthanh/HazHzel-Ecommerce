"use client";

import { Table, InputNumber } from "antd";
import styles from "@/components/common/customer/cart-table/style.module.scss";
import Image from "next/image";
import example from "@/../public/assets/fortune_cardigan.webp";
import CustomButton from "../public-button";
import Link from "next/link";

interface CartItemType {
  id: number;
  brand: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
}

export default function CartTable({ items }: { items: CartItemType[] }) {
  const onChange = (value: number | null) => {};

  const columns = [
    {
      title: "PRODUCT",
      dataIndex: "product",
      render: (_: any, record: CartItemType) => (
        <div className={styles.cartItem}>
          <div className={styles.cartImgWrapper}>
            <Image width={120} height={180} src={example} alt={record.name} />
          </div>
          <div className={styles.productInfo}>
            <a href="/collection/">{record.brand}</a>
            <a href="/product/">{record.name}</a>
            <a>{record.price.toLocaleString("vi-VN")}đ</a>
            <a>{record.size}</a>
          </div>
        </div>
      ),
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      render: (_: any, record: CartItemType) => (
        <div className={styles.quantityItem}>
          <InputNumber
            min={1}
            max={12}
            defaultValue={record.quantity}
            onChange={onChange}
            changeOnWheel
          />
          <button className={styles.removeLink}>Remove</button>
        </div>
      ),
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      render: (_: any, record: CartItemType) =>
        `${(record.price * record.quantity).toLocaleString("vi-VN")}đ`,
    },
  ];

  return (
    <div className={styles.sectionSpacing}>
      <div className={styles.container}>
        <div className={styles.cartWrapper}>
          <h1>CART</h1>
          <p>You are eligible for free shipping.</p>
          <Table
            columns={columns}
            dataSource={items}
            pagination={false}
            rowKey="id"
            bordered={false}
            summary={(pageData) => {
              const total = pageData.reduce((sum, item) => {
                return sum + item.price * item.quantity;
              }, 0);

              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={2} align="right">
                    Total
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    {total.toLocaleString("vi-VN")}đ
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
          <div className={styles.checkOutBtn}>
            <Link href={"/checkout"}>
              <CustomButton>check out</CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
