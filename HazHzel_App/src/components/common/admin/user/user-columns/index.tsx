import { TableProps, Tag, Image } from "antd";
import ActionMenu from "../../action-menu";
import { IUser } from "@/types/next-auth";
interface GetColumnsProps {
  onEdit: (record: IUser) => void;
  onDelete: (id: string) => void;
}

export const getUserColumns = ({
  onEdit,
  onDelete,
}: GetColumnsProps): TableProps<IUser>["columns"] => {
  return [
    {
      title: "User Id",
      dataIndex: "_id",
      width: 250,
    },

    {
      title: "Name",
      dataIndex: "name",
      width: 250,
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: "Role",
      dataIndex: "roles",
      key: "roles",
      width: 150,
      render: (roles) =>
        roles?.length
          ? roles.map((r: any) => (
              <Tag key={r._id} color="blue">
                {r.name}
              </Tag>
            ))
          : "N/A",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      width: 120,
      render: (isActive: boolean) => (
        <span
          style={{
            padding: "4px 12px",
            borderRadius: 6,
            background: isActive ? "#d4edda" : "#f8d7da",
            color: isActive ? "#155724" : "#721c24",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
      width: 100,
      render: (accountType) =>
        accountType ? <Tag color="orange">{accountType}</Tag> : "N/A",
    },
    {
      title: "Action",
      key: "action",
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
