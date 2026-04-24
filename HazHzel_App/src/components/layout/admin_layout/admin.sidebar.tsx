"use client";
import { AdminDashboadContext } from "@/library/admin.context";
import { itemsSidebar } from "@/shared/configs/menu/adminMenu";
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import { usePathname } from "next/navigation";
import { useContext } from "react";

const AdminSideBar = () => {
  const { Sider } = Layout;
  const context = useContext(AdminDashboadContext);
  const pathname = usePathname();

  if (!context) {
    return null;
  }
  const { collapsed } = context;
  const checkPoint = (pathname: string) => {
    if (pathname === "/admin/dashboard/product/list") return "product-list";
    if (pathname === "/admin/dashboard/product/grid") return "product-grid";
    if (pathname === "/admin/dashboard/product/details")
      return "product-details";
    if (pathname === "/admin/dashboard/product/add") return "add-product";
    if (pathname === "/admin/dashboard/user") return "users";
    if (/^\/admin\/dashboard\/user\/[^/]+$/.test(pathname))
      return "user-detail";
    if (pathname === "/admin/dashboard/order/list") return "order-list";
    if (pathname === "/admin/dashboard/order/details") return "order-details";
    if (pathname === "/admin/dashboard/customer/list") return "customer-list";
    if (pathname === "/admin/dashboard/customer/details")
      return "customer-details";
    if (pathname === "/admin/dashboard/customer/add") return "add-customer";
    if (pathname === "/admin/dashboard/shopping-cart/list")
      return "shopping-cart-list";
    if (pathname === "/admin/dashboard/checkout") return "checkout";
    return "dashboard";
  };

  const selectedPage = checkPoint(pathname);
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[selectedPage]}
        items={itemsSidebar}
      />
    </Sider>
  );
};

export default AdminSideBar;
