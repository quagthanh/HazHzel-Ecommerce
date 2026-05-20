import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AccountOverview } from "@/components/common/customer/account/index";
import { getAccountData } from "@/services/account.api";

const AccountPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }
  const account = await getAccountData();

  return <AccountOverview account={account} />;
};

export default AccountPage;
