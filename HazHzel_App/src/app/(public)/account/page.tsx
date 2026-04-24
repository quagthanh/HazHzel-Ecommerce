import { auth } from "@/auth";
import PublicACcountPage from "@/components/layout/public/public.account";
import { redirect } from "next/navigation";

const AccountPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }
  return <PublicACcountPage />;
};

export default AccountPage;
