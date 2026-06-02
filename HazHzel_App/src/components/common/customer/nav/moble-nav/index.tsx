"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Drawer, Collapse } from "antd";
import {
  UserOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import styles from "./style.module.scss";
import { NavMenuItem } from "@/types/navbar";
import { getAbsoluteUrl } from "@/utils/helper";
import { typeNavMenuItem, linkType } from "@/types/enum";
import CartDrawer from "../../drawer/cart-drawer";
import SearchDrawer from "../../drawer/search-drawer";

const MobileNav = ({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: NavMenuItem[];
}) => {
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const buildLink = (item: NavMenuItem, slug: string) => {
    if (item.linkType === linkType.STORES) {
      return `/${linkType.STORES}/${slug}`;
    }
    return `/${linkType.PRODUCTS}?${item.baseParams}&category=${slug.replace(
      /^\//,
      "",
    )}`;
  };

  return (
    <>
      <Drawer
        title="MENU"
        placement="left"
        onClose={onClose}
        open={open}
        width={320}
        footer={
          <div className={styles.mobileUtilities}>
            <Link
              href="/account"
              onClick={onClose}
              className={styles.utilityItem}
            >
              <UserOutlined className={styles.utilityIcon} />
              <span>ACCOUNT</span>
            </Link>

            <div
              className={styles.utilityItem}
              onClick={() => {
                onClose();
                setOpenSearch(true);
              }}
            >
              <SearchOutlined className={styles.utilityIcon} />
              <span>SEARCH</span>
            </div>

            <div
              className={styles.utilityItem}
              onClick={() => {
                onClose();
                setOpenCart(true);
              }}
            >
              <ShoppingCartOutlined className={styles.utilityIcon} />
              <span>CART</span>
            </div>
          </div>
        }
      >
        <Collapse accordion ghost className={styles.mobileCollapse}>
          {items.map((item) => {
            if (item.type === typeNavMenuItem.STATIC) {
              return (
                <div
                  key={item.label}
                  className="ant-collapse-item"
                  style={{ padding: "12px 16px" }}
                >
                  <Link
                    href={getAbsoluteUrl(item.href!)}
                    onClick={onClose}
                    className={styles.mobileMenuHeader}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            }

            return (
              <Collapse.Panel
                header={
                  <Link
                    href={
                      item.linkType === linkType.STORES
                        ? `/${linkType.STORES}`
                        : `/${linkType.PRODUCTS}?${item.baseParams}`
                    }
                    className={styles.mobileMenuHeader}
                    onClick={() => onClose()}
                  >
                    {item.label}
                  </Link>
                }
                key={item.label}
              >
                {item.items?.map((cat, index) => (
                  <div
                    key={`cat-${cat.name}-${index}`}
                    className={styles.mobileSubGroup}
                  >
                    <h5 className={styles.mobileSubTitle}>{cat.name}</h5>
                    <ul className={styles.mobileSubList}>
                      {cat.children?.map((sub: any) => (
                        <li key={`sub-${sub.name}-${index}`}>
                          <Link
                            href={buildLink(item, sub.slug)}
                            onClick={onClose}
                            className={styles.mobileSubLink}
                          >
                            {sub.name}
                          </Link>
                          {sub.children && sub.children.length > 0 && (
                            <ul className={styles.mobileSubList}>
                              {sub.children.map((child: any) => (
                                <li key={`child-${child.name}-${index}`}>
                                  <Link
                                    href={buildLink(item, child.slug)}
                                    onClick={onClose}
                                    className={styles.mobileSubLink}
                                  >
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Collapse.Panel>
            );
          })}
        </Collapse>
      </Drawer>

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
      <SearchDrawer open={openSearch} onClose={() => setOpenSearch(false)} />
    </>
  );
};

export default MobileNav;
