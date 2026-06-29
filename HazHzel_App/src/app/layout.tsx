import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Poppins } from "next/font/google";
import "@/scss/main.scss";
import { auth } from "@/auth";
import TopLoader from "@/components/common/progress-bar";
import AuthInitializer from "@/utils/authInitializer";
import ClientChatWidget from "@/components/common/admin/chat/chat-widget";
import Providers from "@/providers/SessionProvider";
import { roleAccount } from "@/types/enum";

const mainFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-main",
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
  const isSystemAdmin = session?.user?.roleName?.includes(
    roleAccount.SYSTEM_ADMIN,
  );
  const shouldShowChat = session && !isSystemAdmin;
  return (
    <html lang="en">
      <body className={`${mainFont.className} ${mainFont.variable}`}>
        <AntdRegistry>
          <Providers>
            <TopLoader />
            <AuthInitializer user={session?.user} />
            {children}
            {shouldShowChat && <ClientChatWidget session={session} />}
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
