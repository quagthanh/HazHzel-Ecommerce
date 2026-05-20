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
            colorPrimary: "#7D7D7D",
            fontFamily: "Montserrat, sans-serif",
          },
          components: {
            Input: {
              colorText: "#343534",
              colorBgContainer: "#fffbf5",
            },
            Button: {
              colorBgContainer: "#fffbf5",
            },
            Pagination: {
              colorBgContainer: "#fffbf5",
            },
            Select: {
              colorBgContainer: "#fffbf5",
            },
            InputNumber: {
              activeBg: "#fffbf5",
              colorBgContainer: "#fffbf5",
            },
            Table: {
              colorBgContainer: "#fffbf5",
              rowHoverBg: "#fffbf5",
              headerBg: "#fffbf5",
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
