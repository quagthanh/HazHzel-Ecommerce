"use client";
import AnnouncementBarCasoul from "@/components/common/customer/announcement-bar-carousel";
import NavBar from "@/components/common/customer/public-header";
import { announcements } from "@/shared/configs/header";

export type INavItem = {
  label: string;
  baseParams: string;
  items: any[];
};
const PublicHeader = ({ navItems }: { navItems: INavItem[] }) => {
  return (
    <>
      <AnnouncementBarCasoul messages={announcements} />
      <NavBar navGroups={navItems} />
    </>
  );
};
export default PublicHeader;
