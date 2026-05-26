import PublicContent from "@/components/layout/public/client-layout/customer.content";
import PublicFooter from "@/components/layout/public/client-layout/customer.footer";
import PublicHeader from "@/components/layout/public/client-layout/customer.header";
import { getNavMetadata } from "@/services/dynamicNavigation.api";
import { ConfigProvider, Layout } from "antd";

const PublicLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const layoutStyle = {};
  let navItems = [];
  try {
    const res = await getNavMetadata();
    if (!res?.data) {
      console.error("Can not get navItems of nav meta data");
    }
    navItems = res?.data ?? [];
  } catch (error: any) {
    console.error("Error when call API getNavMetadata:", error?.message);
  }
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "var(--black-background)",
            fontFamily: "var(--font-main), sans-serif",
            colorText: "var(--text-color)",
            colorBorder: "var(--border-color)",
          },
          components: {
            Input: {
              colorText: "var(--text-color)",
              colorBgContainer: "var(--bg-color)",
              activeBorderColor: "var(--black-background)",
              hoverBorderColor: "var(--black-background)",
              activeShadow: "none",
            },
            Button: {
              colorBgContainer: "var(--bg-color)",
            },
            Pagination: {
              colorBgContainer: "var(--bg-color)",
            },
            Select: {
              colorBgContainer: "var(--bg-color)",
              optionSelectedBg: "var(--black-background)",
              optionSelectedColor: "var(--white-text-color)",
            },
            InputNumber: {
              activeBg: "var(--bg-color)",
            },
            Table: {
              colorBgContainer: "var(--bg-color)",
              rowHoverBg: "var(--secondary-color)",
              headerBg: "var(--bg-color)",
            },
          },
        }}
      >
        <Layout style={layoutStyle}>
          <PublicHeader navItems={navItems} />
          <PublicContent>{children}</PublicContent>
          <PublicFooter />
        </Layout>
      </ConfigProvider>
    </div>
  );
};
export default PublicLayout;
