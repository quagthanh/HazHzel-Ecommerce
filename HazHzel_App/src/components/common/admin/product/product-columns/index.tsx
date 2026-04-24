import { IProduct } from "@/types/interface";
import { TableProps, Tooltip, Image } from "antd"; // Dùng Image của Antd cho đẹp
import ActionMenu from "../../action-menu";

interface GetColumnsProps {
  onEdit: (record: IProduct) => void;
  onDelete: (id: string) => void;
}

export const getProductColumns = ({
  onEdit,
  onDelete,
}: GetColumnsProps): TableProps<IProduct>["columns"] => {
  return [
    {
      title: "Product Id",
      dataIndex: "_id",
      width: 250,
    },
    {
      title: "Image",
      dataIndex: "images",
      width: 100,
      render: (images) =>
        images?.[0]?.secure_url ? (
          <Image
            src={images[0].secure_url}
            width={50}
            height={70}
            style={{ objectFit: "cover", borderRadius: 6 }}
            alt="product"
            preview={true}
          />
        ) : (
          "—"
        ),
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 250,
      sorter: true,
    },
    {
      title: "Category",
      dataIndex: ["categoryId", "name"],
      width: 180,
      render: (_, record) => record.categoryId?.name || "None",
    },
    {
      title: "Supplier",
      dataIndex: ["supplierId", "name"],
      width: 180,
      render: (_, record) => record.supplierId?.name || "None",
    },
    {
      title: "Stock",
      dataIndex: "stockQuantity",
      width: 100,
      sorter: true,
    },
    {
      title: "Price (VND)",
      dataIndex: ["currentPrice"],
      width: 180,
      sorter: true,
      render: (_, record) =>
        record?.currentPrice ? (
          `${record.currentPrice.toLocaleString("vi-VN")} `
        ) : (
          <Tooltip title="Need to create new variant">
            <span style={{ color: "#faad14" }}>Not priced</span>
          </Tooltip>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      render: (status) => (
        <span
          style={{
            padding: "4px 12px",
            borderRadius: 6,
            background: status === "ACTIVE" ? "#d4edda" : "#f8d7da",
            color: status === "ACTIVE" ? "#155724" : "#721c24",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: 100,
    },
    {
      title: "Action",
      width: 100,
      align: "center",
      render: (_, record) => (
        <ActionMenu
          onEdit={() => onEdit(record)}
          onDelete={() => onDelete(record._id)}
        />
      ),
    },
  ];
};
