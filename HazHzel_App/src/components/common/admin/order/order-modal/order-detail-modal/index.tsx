"use client";

import { statusOrderEnum, statusPaymentEnum } from "@/types/enum";
import {
  Modal,
  Descriptions,
  Table,
  Typography,
  Tag,
  Divider,
  Image,
} from "antd";

const { Text } = Typography;

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataDetail: any | null;
}

const OrderDetailModal = ({
  isOpen,
  onClose,
  dataDetail,
}: OrderDetailModalProps) => {
  if (!dataDetail) return null;

  // Cấu hình cột cho bảng Order Items
  const itemColumns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {record.image ? (
            <Image
              src={record.image}
              alt={text}
              width={40}
              height={40}
              style={{ objectFit: "cover", borderRadius: 4 }}
            />
          ) : (
            <div
              style={{
                width: 40,
                height: 40,
                background: "#f0f0f0",
                borderRadius: 4,
              }}
            />
          )}
          <Text strong>{text}</Text>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <Text>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price)}
        </Text>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center" as const,
    },
    {
      title: "Subtotal",
      key: "subtotal",
      align: "right" as const,
      render: (_: any, record: any) => (
        <Text strong>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(record.price * record.quantity)}
        </Text>
      ),
    },
  ];

  return (
    <Modal
      title={`Order Details: ${dataDetail._id.substring(dataDetail._id.length - 6).toUpperCase()}`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Descriptions
        title="Customer & Shipping Info"
        bordered
        column={2}
        size="small"
      >
        <Descriptions.Item label="Customer ID" span={2}>
          {dataDetail.userId}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          {dataDetail.shippingAddress?.street},{" "}
          {dataDetail.shippingAddress?.ward},{" "}
          {dataDetail.shippingAddress?.district},{" "}
          {dataDetail.shippingAddress?.city}
        </Descriptions.Item>
        <Descriptions.Item label="Order Status">
          <Tag
            color={
              dataDetail.status === statusOrderEnum.COMPLETED
                ? "success"
                : "processing"
            }
          >
            {dataDetail.status}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Payment Status">
          <Tag
            color={
              dataDetail.payment?.status === statusPaymentEnum.COMPLETED
                ? "success"
                : "warning"
            }
          >
            {dataDetail.payment?.status || "PENDING"}
          </Tag>
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Order Items</Divider>

      <Table
        dataSource={dataDetail.items.map((item: any, index: number) => ({
          ...item,
          key: index,
        }))}
        columns={itemColumns}
        pagination={false}
        bordered
      />

      <div
        style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}
      >
        <div style={{ width: 300 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text>Subtotal:</Text>
            <Text>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(dataDetail.subTotal)}
            </Text>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text>Shipping Cost:</Text>
            <Text>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(dataDetail.shippingCost)}
            </Text>
          </div>
          {dataDetail.discount && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text>Discount ({dataDetail.discount.code}):</Text>
              <Text type="danger">
                -
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(dataDetail.discount.priceAtTime)}
              </Text>
            </div>
          )}
          <Divider style={{ margin: "12px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text strong style={{ fontSize: 16 }}>
              Total Price:
            </Text>
            <Text strong style={{ fontSize: 18, color: "#d9363e" }}>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(dataDetail.totalPrice)}
            </Text>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
