"use client";
import AdminDropdown from "@/components/common/admin/user/header/header-dropdown";
import { userMenu } from "@/shared/configs/menu/adminMenu";
import { BellOutlined } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Layout, Select, Space, Tooltip } from "antd";
import { signOut } from "next-auth/react";

const { Header } = Layout;

const AdminHeader = ({ session }: any) => {
  const handleClick = (e: any) => {
    if (e.key === "logout") {
      console.log("Logout button is clicked");
      signOut({ callbackUrl: "/auth/login" });
    }
  };
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        background: "black",
        padding: "0 24px",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        LOGO
      </div>

      <Space size="large">
        <Select
          defaultValue="vi"
          options={[
            { value: "vi", label: "VN" },
            { value: "en", label: "EN" },
          ]}
        />

        <Tooltip title="Thông báo">
          <Badge count={5} size="small">
            <BellOutlined style={{ fontSize: 20, color: "white" }} />
          </Badge>
        </Tooltip>
        <AdminDropdown session={session} />
      </Space>
    </Header>
  );
};

export default AdminHeader;
