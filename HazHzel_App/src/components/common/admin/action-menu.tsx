"use client";
import { Dropdown, MenuProps, message, Modal } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface ActionMenuProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  deleteConfirmTitle?: string;
  deleteConfirmDescription?: string;
}
const { confirm } = Modal;

const ActionMenu = ({
  onView,
  onEdit,
  onDelete,
  deleteConfirmTitle = "Do you want to delete this item?",
  deleteConfirmDescription = "Check again before you delete it permanently",
}: ActionMenuProps) => {
  const router = useRouter();
  const showConfirm = () => {
    confirm({
      title: deleteConfirmTitle,
      icon: <ExclamationCircleFilled />,
      content: deleteConfirmDescription,

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
  const items: MenuProps["items"] = [];

  if (onView) {
    items.push({
      key: "view",
      label: "View detail",
      icon: <EyeOutlined />,
      onClick: onView,
    });
  }

  if (onEdit) {
    items.push({
      key: "edit",
      label: "Edit",
      icon: <EditOutlined />,
      onClick: onEdit,
    });
  }

  if (onDelete) {
    items.push({
      key: "delete",
      label: "Delete",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: showConfirm,
    });
  }

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
