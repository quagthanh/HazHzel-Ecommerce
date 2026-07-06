import { TableProps, Tag, Typography } from "antd";
import ActionMenu from "../../action-menu";
import { statusOrderEnum, statusPaymentEnum } from "@/types/enum";

const { Text } = Typography;

interface GetOrderColumnsProps {
  onEdit: (record: any) => void;
  onView: (record: any) => void;
}

export const getOrderColumns = ({
  onEdit,
  onView,
}: GetOrderColumnsProps): TableProps<any>["columns"] => {
  return [
    {
      title: "Order ID",
      dataIndex: "_id",
      width: 120,
      render: (id) => <Text copyable>{id}</Text>,
    },
    {
      title: "Customer",
      dataIndex: "userId",
      width: 200,
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <b>{record.shippingAddress?.name || "N/A"}</b>
          <span style={{ fontSize: 13, color: "#666" }}>
            {record.shippingAddress?.phone}
          </span>
        </div>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      width: 150,
      render: (price) => (
        <span style={{ fontWeight: 600, color: "#d9363e" }}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price)}
        </span>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "status",
      width: 150,
      align: "center",
      render: (status: statusOrderEnum) => {
        let color = "default";
        if (status === statusOrderEnum.COMPLETED) color = "success";
        if (status === statusOrderEnum.CANCELLED) color = "error";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Payment",
      dataIndex: "payment",
      width: 150,
      align: "center",
      render: (payment) => {
        const status = payment?.status;
        return (
          <Tag
            color={
              status === statusPaymentEnum.COMPLETED ? "success" : "warning"
            }
          >
            {status || "PENDING"}
          </Tag>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      width: 150,
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Action",
      width: 80,
      align: "center",
      render: (_, record) => (
        <ActionMenu
          onEdit={() => onEdit(record)}
          onView={() => onView(record)}
        />
      ),
    },
  ];
};
