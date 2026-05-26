import { ProfileContent } from "@/components/common/customer/account-profile";
import { getMyAccount } from "@/services/account.api";
import { Spin } from "antd";
import { Suspense } from "react";

export default async function ProfilePage() {
  const res = await getMyAccount();
  const profileData = res.data ?? [];
  return (
    <Suspense fallback={<Spin />}>
      <ProfileContent initialData={profileData} />
    </Suspense>
  );
}
