"use client";
import { Layout } from "antd";

const PublicContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { Content } = Layout;

  return (
    <Content>
      <div>{children}</div>
    </Content>
  );
};

export default PublicContent;
