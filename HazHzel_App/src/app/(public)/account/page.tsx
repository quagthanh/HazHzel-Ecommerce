import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AccountOverview } from "@/components/common/customer/account/index";
import { getMyAccountOverview } from "@/services/account.api";

const AccountPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }
  const res = await getMyAccountOverview();
  const account = res.data ?? [];

  return <AccountOverview account={account} />;
};

export default AccountPage;
