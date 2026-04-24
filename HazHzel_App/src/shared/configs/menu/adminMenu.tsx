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
          {
            key: "product-grid",
            label: (
              <Link href="/admin/dashboard/product/grid">Product Grid</Link>
            ),
          },
          {
            key: "product-details",
            label: (
              <Link href="/admin/dashboard/product/details">
                Product Detail
              </Link>
            ),
          },
          {
            key: "add-product",
            label: <Link href="/admin/dashboard/product/add">Add Product</Link>,
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
          {
            key: "user-detail",
            label: <Link href="">User Overview</Link>,
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
          {
            key: "supplier-detail",
            label: <Link href="">Supplier Overview</Link>,
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
          {
            key: "category-detail",
            label: <Link href="">Category Overview</Link>,
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
          {
            key: "collection-detail",
            label: <Link href="">Collection Overview</Link>,
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
          {
            key: "order-details",
            label: (
              <Link href="/admin/dashboard/order/details">Order Detail</Link>
            ),
          },
        ],
      },
      {
        key: "customer",
        label: "Customers",
        icon: <SettingOutlined />,
        children: [
          {
            key: "customer-list",
            label: (
              <Link href="/admin/dashboard/customer/list">Customer List</Link>
            ),
          },
          {
            key: "customer-details",
            label: (
              <Link href="/admin/dashboard/customer/details">
                Customer Details
              </Link>
            ),
          },
          {
            key: "add-customer",
            label: (
              <Link href="/admin/dashboard/customer/add">Add Customer</Link>
            ),
          },
        ],
      },
      {
        key: "shopping-cart",
        label: "Shopping Cart",
        icon: <ShoppingCartOutlined />,
        children: [
          {
            key: "shopping-cart-list",
            label: (
              <Link href="/admin/dashboard/shopping-cart/list">
                Shopping Cart List
              </Link>
            ),
          },
        ],
      },
      {
        key: "checkout",
        label: <Link href="/admin/dashboard/checkout">Checkout</Link>,
        icon: <CreditCardOutlined />,
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
