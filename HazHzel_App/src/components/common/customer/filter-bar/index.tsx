"use client";

import { useState, useRef, useEffect } from "react";
import {
  AppstoreFilled,
  CloseCircleFilled,
  DownOutlined,
  TableOutlined,
  UnorderedListOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import styles from "@/components/common/customer/filter-bar/style.module.scss";
import useGridStore from "@/library/stores/useGridStore";

const sortOptions = [
  "Featured",
  "Best selling",
  "Alphabetically, A-Z",
  "Alphabetically, Z-A",
  "Price, low to high",
  "Price, high to low",
  "Date, old to new",
  "Date, new to old",
];

const FilterBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Sort by");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };
  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected("Sort by");
    setIsOpen(false);
  };
  const setColumCount = useGridStore((state) => state.setColumCount);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.filterBar}>
      <div className={styles.viewMode}>
        <Button
          type="link"
          icon={
            <UnorderedListOutlined
              style={{ color: "gray", fontSize: "18px" }}
            />
          }
          onClick={() => setColumCount(3)}
        />

        <Button
          type="link"
          icon={
            <AppstoreFilled
              style={{ color: "gray", fontSize: "18px" }}
              onClick={() => setColumCount(4)}
            />
          }
        />
        <Button
          type="link"
          icon={
            <TableOutlined
              style={{ color: "gray", fontSize: "18px" }}
              onClick={() => setColumCount(6)}
            />
          }
        />
      </div>

      <div className={styles.allProductCount}>PRODUCTS</div>
      <div className={styles.allProductCountMobile}>FILTER</div>

      <div className={styles.sortBy}>
        <div className={styles.sortWrapper} ref={dropdownRef}>
          <button className={styles.sortButton} onClick={toggleDropdown}>
            {selected}
            {selected !== "Sort by" && (
              <CloseCircleFilled
                style={{ fontSize: "14px", color: "#999", marginLeft: "8px" }}
                onClick={handleReset}
              />
            )}
            <span className={styles.arrow}>
              {isOpen ? (
                <UpOutlined style={{ fontSize: "10px" }} />
              ) : (
                <DownOutlined style={{ fontSize: "10px" }} />
              )}
            </span>
          </button>
          {isOpen && (
            <ul className={styles.sortMenu}>
              {sortOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`${styles.sortItem} ${
                    selected === option ? styles.active : ""
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
