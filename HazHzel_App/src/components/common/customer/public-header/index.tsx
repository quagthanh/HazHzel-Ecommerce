"use client";
import Image from "next/image";
import styles from "@/components/common/customer/public-header/style.module.scss";
import { Header } from "antd/es/layout/layout";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import DesktopNav from "../nav/desktop-nav";
import MobileNav from "../nav/moble-nav";
import NavIcons from "../nav/nav-icons";
import { INavItem } from "@/components/layout/public/client-layout/customer.header";
import { staticItemsConfig } from "@/shared/configs/header";
import { NavMenuItem } from "@/types/navbar";
import { typeNavMenuItem } from "@/types/enum";
import Logo from "@/components/common/auth/login-logo";

interface NavBarProps {
  navGroups: INavItem[] | [];
}
const NavBar: React.FC<NavBarProps> = ({ navGroups = [] }) => {
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const showMobileMenu = () => setOpenMobileMenu(true);

  const dynamicItems: NavMenuItem[] = navGroups.map((g) => ({
    type: typeNavMenuItem.DYNAMIC,
    label: g.label,
    baseParams: g.baseParams,
    linkType: g.linkType,
    items: g.items,
  }));

  const staticItems: NavMenuItem[] = staticItemsConfig.map((s) => ({
    type: typeNavMenuItem.STATIC,
    label: s.label,
    href: s.href,
  }));

  const allNavItems = [...dynamicItems, ...staticItems];

  const headerStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    height: 100,
    backgroundColor: "rgb(255, 251, 245)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: "600",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textTransform: "uppercase",
  };
  return (
    <Header style={headerStyle} className={styles.headerMain}>
      <div className={styles.headerLogo}>
        <div className={styles.leftMobileNav}>
          <Button
            type="link"
            icon={<MenuOutlined style={{ color: "gray", fontSize: "20px" }} />}
            onClick={showMobileMenu}
          />
        </div>
        <div className={styles.centerLogo}>
          <Link href="/" className={styles.headerLogo}>
            <Logo></Logo>
          </Link>
        </div>
      </div>
      <DesktopNav items={allNavItems} />
      <NavIcons />
      <MobileNav
        open={openMobileMenu}
        onClose={() => setOpenMobileMenu(false)}
        items={allNavItems}
      />
    </Header>
  );
};
export default NavBar;
