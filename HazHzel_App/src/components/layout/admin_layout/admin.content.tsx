"use client";
import { AdminDashboadContext } from "@/library/admin.context";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Layout, theme } from "antd";
import React, { useContext } from "react";

const { Header, Content, Footer, Sider } = Layout;

const AdminContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const context = useContext(AdminDashboadContext);
  if (!context) {
    return null;
  }
  const { collapsed, setCollapsed } = context;

  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </Header>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "User" }, { title: "Bill" }]}
        />
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
    </>
  );
};

export default AdminContent;
