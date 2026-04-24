import { ISupplier } from "@/types/interface";
import { TableProps, Image, Tag, Tooltip } from "antd";
import ActionMenu from "../../action-menu";

interface GetSupplierColumnsProps {
  onEdit: (record: ISupplier) => void;
  onDelete: (id: string) => void;
}

export const getSupplierColumns = ({
  onEdit,
  onDelete,
}: GetSupplierColumnsProps): TableProps<ISupplier>["columns"] => {
  return [
    {
      title: "Logo",
      dataIndex: "images",
      width: 80,
      align: "center",
      render: (images) => {
        const logoUrl =
          images?.[0]?.secure_url || images?.[0]?.url || images?.[0];

        return logoUrl ? (
          <Image
            src={logoUrl}
            width={40}
            height={40}
            style={{
              objectFit: "contain",
              borderRadius: "50%",
              border: "1px solid #eee",
            }}
            alt="logo"
          />
        ) : (
          "—"
        );
      },
    },
    {
      title: "Company Name",
      dataIndex: "name",
      width: 200,
      sorter: true,
      render: (name) => <span style={{ fontWeight: 600 }}>{name}</span>,
    },
    {
      title: "Contact Info",
      width: 280,
      render: (_, record) => (
        <div
          style={{
            fontSize: 13,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div>
            <b>{record.contactName || "N/A"}</b>
          </div>
          <div style={{ color: "#555" }}> {record.phone || "—"}</div>
          <div style={{ color: "#1890ff" }}> {record.email}</div>
        </div>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      align: "center",
      render: (status) => (
        <Tag
          color={status ? "success" : "default"}
          style={{ minWidth: 60, textAlign: "center" }}
        >
          {status ? "ACTIVE" : "INACTIVE"}
        </Tag>
      ),
    },
    {
      title: "Action",
      width: 80,
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
