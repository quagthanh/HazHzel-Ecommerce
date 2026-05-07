import { ProfileContent } from "@/components/common/customer/account-profile";
import { getProfileData } from "@/services/account.api";
import { Spin } from "antd";
import { Suspense } from "react";

export default async function ProfilePage() {
  const profileData = await getProfileData();
  return (
    <Suspense fallback={<Spin />}>
      <ProfileContent initialData={profileData} />
    </Suspense>
  );
}
