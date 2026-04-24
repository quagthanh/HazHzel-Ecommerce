"use client";
import { Button, Dropdown, MenuProps, message, Modal, Popconfirm } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface ActionMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  deleteConfirmTitle?: string;
  deleteConfirmDescription?: string;
}
const { confirm } = Modal;

const ActionMenu = ({ onEdit, onDelete }: ActionMenuProps) => {
  const router = useRouter();
  const showConfirm = () => {
    confirm({
      title: "Do you want to delete these products?",
      icon: <ExclamationCircleFilled />,
      content: "Check againt before you deleted it permanently ",

      async onOk() {
        if (onDelete) {
          try {
            await onDelete();
            message.success("Delete products successfully");
            router.refresh();
          } catch (error) {
            message.error("Error rise when deleting products");
            return Promise.reject(error);
          }
        }
      },
      onCancel() {},
    });
  };
  const items: MenuProps["items"] = [
    {
      key: "edit",
      label: "Chỉnh sửa",
      icon: <EditOutlined />,
      onClick: onEdit,
    },
    {
      key: "delete",
      label: "Xóa",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: showConfirm,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <MoreOutlined
        style={{
          fontSize: 20,
          cursor: "pointer",
          padding: 4,
        }}
      />
    </Dropdown>
  );
};

export default ActionMenu;
