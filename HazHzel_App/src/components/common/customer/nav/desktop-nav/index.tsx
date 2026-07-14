"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { NavMenuItem } from "@/types/navbar";
import { getAbsoluteUrl } from "@/utils/helper";
import { linkType, typeNavMenuItem } from "@/types/enum";

const DesktopNav = ({ items }: { items: NavMenuItem[] }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const buildLink = (item: NavMenuItem, slug: string) => {
    if (item.linkType === linkType.STORES) {
      return `/${linkType.STORES}/${slug}`;
    }

    return `/${linkType.PRODUCTS}?${item.baseParams}&filterCategory=${slug}`;
  };
  return (
    <nav className={styles.headerPrimaryNav}>
      <ul className={styles.unstyledList}>
        {items.map((item) => {
          if (item.type === typeNavMenuItem.STATIC) {
            return (
              <li key={item.label} className={styles.headerPrimaryNavItem}>
                <Link href={getAbsoluteUrl(item.href!)} className={styles.h6}>
                  {item.label}
                </Link>
              </li>
            );
          }

          return (
            <li
              key={item.label}
              className={styles.headerPrimaryNavItem}
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {/* Header in nav bar */}
              <div className={styles.h6}>
                <Link
                  href={
                    item.linkType === linkType.STORES
                      ? `/${linkType.STORES}`
                      : `/${linkType.PRODUCTS}?${item.baseParams}`
                  }
                  className={styles.h6}
                >
                  {item.label}
                </Link>
              </div>

              {item.items && item.items.length > 0 && (
                <div
                  className={`${styles.megaMenu} ${openDropdown === item.label ? styles.megaMenuActive : ""}`}
                >
                  <div className={styles.megaMenuContainer}>
                    <div className={styles.menuColumnsWrapper}>
                      {item.items.map((cat, index) => (
                        <div
                          key={`cat-${cat.name}-${index}`}
                          className={styles.menuColumn}
                        >
                          <h4 className={styles.columnTitle}>{cat.name}</h4>
                          <ul className={styles.columnList}>
                            {cat.children?.map((sub: any) => (
                              <li key={sub._id}>
                                <Link
                                  href={buildLink(item, sub.slug)}
                                  className={styles.linkFaded}
                                >
                                  {sub.name}
                                </Link>
                                {sub.children && sub.children.length > 0 && (
                                  <ul style={{ marginLeft: "10px" }}>
                                    {sub.children.map((child: any) => (
                                      <li key={child._id}>
                                        <Link
                                          href={buildLink(item, child.slug)}
                                          className={styles.linkFaded}
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
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default DesktopNav;
