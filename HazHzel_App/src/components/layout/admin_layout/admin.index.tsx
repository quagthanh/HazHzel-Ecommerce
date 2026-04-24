"use client";
import { AdminDashboadProvider } from "@/library/admin.context";
import { Layout } from "antd";
import React from "react";
import AdminContent from "./admin.content";
import AdminFooter from "./admin.footer";
import AdminHeader from "./admin.header";
import AdminSideBar from "./admin.sidebar";

const AdminDashBoardLayout = ({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session:any
}>) => {
  return (
    <AdminDashboadProvider>
      <Layout>
        <AdminHeader session={session} />
        <Layout style={{ minHeight: "100vh" }}>
          <AdminSideBar />
          <Layout>
            <AdminContent>{children}</AdminContent>
            <AdminFooter />
          </Layout>
        </Layout>
      </Layout>
    </AdminDashboadProvider>
  );
};

export default AdminDashBoardLayout;
