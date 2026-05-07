import type { AccountData, UserProfile } from "@/types/account/index";

// Replace with real API/DB calls in production
export async function getAccountData(): Promise<AccountData> {
  return {
    user: {
      name: "Đinh",
      email: "dinhquangthanh11@gmail.com",
      phone: "+84987364536",
    },
    latestOrder: null,
  };
}
export async function getProfileData(): Promise<UserProfile> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    email: "DINHQUANGTHANH11@GMAIL.COM",
    title: "MR",
    firstName: "ĐINH",
    lastName: "QUANG THÀNH",
    phoneCode: "+84",
    phoneNumber: "987 364 536",
    birthdate: "",
    newsletterSubscribed: true,
    smsSubscribed: true,
  };
}
