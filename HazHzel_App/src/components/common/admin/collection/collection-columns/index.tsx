import { ICategory, ICollection, ISupplier } from "@/types/interface";
import { TableProps, Image, Tag, Tooltip } from "antd";
import ActionMenu from "../../action-menu";

interface GetCollectionColumnsProps {
  onEdit: (record: ICollection) => void;
  onDelete: (id: string) => void;
}

export const getCollectionColumns = ({
  onEdit,
  onDelete,
}: GetCollectionColumnsProps): TableProps<ICollection>["columns"] => {
  return [
    {
      title: "Logo",
      dataIndex: "images",
      width: 80,
      align: "center",
      render: (images) =>
        images?.[0]?.secure_url ? (
          <Image
            src={images[0].secure_url}
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
        ),
    },
    {
      title: "Collection Name",
      dataIndex: "name",
      width: 200,
      sorter: true,
      render: (name) => <span style={{ fontWeight: 600 }}>{name}</span>,
    },
    {
      title: "Description Name",
      dataIndex: "description",
      width: 200,
      sorter: true,
      render: (description) =>
        description ? (
          <span style={{ fontWeight: "600" }}> {description}</span>
        ) : (
          <Tooltip title="Need to add description">
            <span style={{ color: "#faad14" }}>None</span>
          </Tooltip>
        ),
    },
    {
      title: "Collection Slug",
      dataIndex: "slug",
      width: 200,
      sorter: true,
      render: (slug) => <span style={{ fontWeight: 600 }}>{slug}</span>,
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
