"use client";
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  CreditCardOutlined,
  LogoutOutlined,
  MailOutlined,
  ProfileOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Menu, type MenuProps } from "antd";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
type MenuItem = Required<MenuProps>["items"][number];
export const itemsSidebar: MenuItem[] = [
  {
    key: "grp",
    label: "AccountFreak",
    type: "group",
    children: [
      {
        key: "dashboard",
        label: <Link href="/admin/dashboard">Dashboard</Link>,
        icon: <AppstoreOutlined />,
      },
      {
        key: "product",
        label: "Products",
        icon: <MailOutlined />,
        children: [
          {
            key: "product-list",
            label: (
              <Link href="/admin/dashboard/product/list">Product List</Link>
            ),
          },
        ],
      },
      {
        key: "users",
        label: "Users",
        icon: <TeamOutlined />,
        children: [
          {
            key: "user-list",
            label: <Link href="/admin/dashboard/user/list">User List</Link>,
          },
        ],
      },
      {
        key: "suppliers",
        label: "Suppliers",
        icon: <ShopOutlined />,
        children: [
          {
            key: "supplier-list",
            label: (
              <Link href="/admin/dashboard/supplier/list">Supplier List</Link>
            ),
          },
        ],
      },
      {
        key: "categories",
        label: "Categories",
        icon: <AppstoreAddOutlined />,
        children: [
          {
            key: "category-list",
            label: (
              <Link href="/admin/dashboard/category/list">Category List</Link>
            ),
          },
        ],
      },
      {
        key: "collections",
        label: "Collections",
        icon: <UnorderedListOutlined />,
        children: [
          {
            key: "collection-list",
            label: (
              <Link href="/admin/dashboard/collection/list">
                Collection List
              </Link>
            ),
          },
        ],
      },
      {
        key: "order",
        label: "Orders",
        icon: <ProfileOutlined />,
        children: [
          {
            key: "order-list",
            label: <Link href="/admin/dashboard/order/list">Order List</Link>,
          },
        ],
      },
      {
        key: "chat",
        label: <Link href="/admin/dashboard/chat">Messages</Link>,
        icon: <MessageSquare width={16} />,
      },
    ],
  },
];
export const userMenu = [
  {
    key: "1",
    label: "Profile",
  },
  {
    key: "2",
    label: "Logout",
  },
];
