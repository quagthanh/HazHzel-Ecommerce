"use client";

import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, message, Space } from "antd";
import { signOut } from "next-auth/react";
import Link from "next/link";
import router from "next/router";

export interface IAdminDropdown {
  session: any;
}
const AdminDropdown = ({ session }: IAdminDropdown) => {
  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: "Hồ sơ cá nhân",
      icon: <UserOutlined />,
      onClick: () => router.push("/admin/profile"),
    },
    {
      key: "settings",
      label: <Link href="/admin/settings">Cài đặt</Link>,
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: async () => {
        await signOut({ callbackUrl: "/auth/login" });
        message.success("Đăng xuất thành công!");
      },
    },
  ];
  return (
    <>
      <Dropdown
        menu={{ items }}
        placement="bottomRight"
        trigger={["click"]}
        arrow
      >
        <Space style={{ cursor: "pointer", color: "white" }}>
          <Avatar
            src={session?.user?.image || "https://i.pravatar.cc/150?img=3"}
            alt={session?.user?.name}
          />
          <span style={{ userSelect: "none" }}>
            {session?.user?.name || "Admin User"}
          </span>
        </Space>
      </Dropdown>
    </>
  );
};
export default AdminDropdown;
