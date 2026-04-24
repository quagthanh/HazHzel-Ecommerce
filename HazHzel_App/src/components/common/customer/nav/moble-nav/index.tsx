"use client";
import React from "react";
import Link from "next/link";
import { Drawer, Collapse } from "antd";
import styles from "./style.module.scss";
import { NavMenuItem } from "@/types/navbar";
import { getAbsoluteUrl } from "@/utils/helper";

const MobileNav = ({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: NavMenuItem[];
}) => {
  return (
    <Drawer
      title="MENU"
      placement="left"
      onClose={onClose}
      open={open}
      width={320}
    >
      <Collapse accordion ghost className={styles.mobileCollapse}>
        {items.map((item) => {
          if (item.type === "static") {
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
                <span className={styles.mobileMenuHeader}>{item.label}</span>
              }
              key={item.label}
            >
              {item.items?.map((cat) => (
                <div key={cat._id} className={styles.mobileSubGroup}>
                  <h5 className={styles.mobileSubTitle}>{cat.name}</h5>
                  <ul className={styles.mobileSubList}>
                    {cat.children?.map((sub: any) => (
                      <li key={sub._id}>
                        <Link
                          href={`/products?${item.baseParams}&category=${sub.slug.replace(/^\//, "")}`}
                          onClick={onClose}
                          className={styles.mobileSubLink}
                        >
                          {sub.name}
                        </Link>
                        {sub.children && sub.children.length > 0 && (
                          <ul className={styles.mobileSubList}>
                            {sub.children.map((child: any) => (
                              <li key={child._id}>
                                <Link
                                  href={`/products?${item.baseParams}&category=${child.slug.replace(/^\//, "")}`}
                                  onClick={onClose}
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
  );
};
export default MobileNav;
