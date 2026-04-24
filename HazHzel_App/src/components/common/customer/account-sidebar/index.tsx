"use client";

import { signOut } from "next-auth/react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  DownOutlined,
  UserOutlined,
  CarOutlined,
  EnvironmentOutlined,
  HistoryOutlined,
  SearchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import styles from "./style.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

interface AccountSidebarProps {
  activeTab: string;
  onTabChange: (key: string) => void;
}

const AccountSidebar = ({ activeTab, onTabChange }: AccountSidebarProps) => {
  const menuItems: MenuItem[] = [
    {
      key: "membership",
      icon: <DownOutlined />,
      label: "Thông Tin Hạng Thành Viên",
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Thông Tin Cá Nhân",
    },
    {
      key: "orders",
      icon: <CarOutlined />,
      label: "Đơn Hàng",
    },
    {
      key: "address",
      icon: <EnvironmentOutlined />,
      label: "Địa Chỉ",
    },
    {
      key: "recently-viewed",
      icon: <HistoryOutlined />,
      label: "Đã Xem Gần Đây",
    },
    {
      key: "track-order",
      icon: <SearchOutlined />,
      label: "Kiểm Tra Đơn Hàng",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng Xuất",
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      signOut();
      return;
    }
    onTabChange(key);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.welcomeText}>Chào mừng bạn!</h2>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[activeTab]}
        onClick={handleMenuClick}
        items={menuItems}
        className={styles.sidebarMenu}
      />
    </div>
  );
};

export default AccountSidebar;
