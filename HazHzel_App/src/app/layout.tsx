import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Montserrat } from "next/font/google";
import "@/scss/partial/_body.scss";
import { auth } from "@/auth";
import TopLoader from "@/components/common/progress-bar";
import AuthInitializer from "@/utils/authInitializer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "AccounFreak",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AntdRegistry>
          <TopLoader />
          <AuthInitializer user={session?.user} />
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
