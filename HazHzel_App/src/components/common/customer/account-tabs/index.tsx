"use client";

import { useState } from "react";
import { Layout } from "antd";
import { useAuthStore } from "@/library/stores/useAuthStore";
import styles from "./style.module.scss";
import ProfileForm from "../account-profile-form";
import OrdersSection from "../account-order-section";
import AccountSidebar from "../account-sidebar";

const { Sider, Content } = Layout;

const AccountTabs = () => {
  const { userDetail } = useAuthStore();
  const user = userDetail;
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileForm user={user} />;
      case "orders":
        return <OrdersSection />;
      default:
        return (
          <div className={styles.profileSection}>
            <h1 className={styles.sectionTitle}>Sắp Ra Mắt</h1>
            <p style={{ color: "#888", marginTop: 16 }}>
              Tính năng này đang được phát triển.
            </p>
          </div>
        );
    }
  };

  return (
    <Layout className={styles.accountPage}>
      <Sider
        width={280}
        className={styles.accountSider}
        breakpoint="md"
        collapsedWidth={0}
      >
        <AccountSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </Sider>
      <Content className={styles.accountContent}>{renderContent()}</Content>
    </Layout>
  );
};

export default AccountTabs;
