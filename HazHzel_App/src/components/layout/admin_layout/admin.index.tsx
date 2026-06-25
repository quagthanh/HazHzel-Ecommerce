"use client";
import { AdminDashboadProvider } from "@/library/admin.context";
import { Layout } from "antd";
import React from "react";
import AdminContent from "./admin.content";
import AdminFooter from "./admin.footer";
import AdminHeader from "./admin.header";
import AdminSideBar from "./admin.sidebar";
import Providers from "@/providers/SessionProvider";

const AdminDashBoardLayout = ({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) => {
  return (
    <AdminDashboadProvider>
      <Layout>
        <Providers>
          <AdminHeader session={session} />
          <Layout style={{ minHeight: "100vh" }}>
            <AdminSideBar />
            <Layout>
              <AdminContent>{children}</AdminContent>
              <AdminFooter />
            </Layout>
          </Layout>
        </Providers>
      </Layout>
    </AdminDashboadProvider>
  );
};

export default AdminDashBoardLayout;
