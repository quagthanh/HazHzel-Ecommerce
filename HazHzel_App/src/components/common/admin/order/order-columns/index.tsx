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
      width: 140,
      render: (id) => <Text copyable>{id}</Text>,
    },
    {
      title: "Customer",
      dataIndex: "userId",
      width: 180,
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <b>{record.shippingAddress?.name || "N/A"}</b>
          <span>{record.shippingAddress?.phone}</span>
        </div>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      width: 150,
      render: (price) => (
        <span style={{ fontWeight: 600 }}>
          {new Intl.NumberFormat("vi-VN").format(price)}
        </span>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "status",
      width: 150,
      align: "center",
      render: (status: statusOrderEnum) => {
        let color = "warning";
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
      title: "Created Date",
      dataIndex: "createdAt",
      width: 75,
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Updated Date",
      dataIndex: "updatedAt",
      width: 75,
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
