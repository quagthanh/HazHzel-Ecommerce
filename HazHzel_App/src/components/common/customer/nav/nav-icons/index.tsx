"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "./style.module.scss";
import CartDrawer from "../../drawer/cart-drawer";
import SearchDrawer from "../../drawer/search-drawer";

const NavIcons = () => {
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  return (
    <div className={styles.headerSecondaryNav}>
      <Button
        type="link"
        icon={<UserOutlined style={{ color: "gray", fontSize: "24px" }} />}
        href="/account"
      />

      <Button
        type="link"
        icon={<SearchOutlined style={{ color: "gray", fontSize: "24px" }} />}
        onClick={() => setOpenSearch(true)}
      />

      <Button
        type="link"
        icon={
          <ShoppingCartOutlined style={{ color: "gray", fontSize: "24px" }} />
        }
        onClick={() => setOpenCart(true)}
      />

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
      <SearchDrawer open={openSearch} onClose={() => setOpenSearch(false)} />
    </div>
  );
};

export default NavIcons;
