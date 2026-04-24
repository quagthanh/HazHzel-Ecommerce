"use client";
import styles from "@/components/common/customer/product-detail-tabs/style.module.scss";
import { useState } from "react";
import DropdownSection from "../filter-sidebar.tsx/DropdownSection";

const ProductDetailsTabs = ({ description }: { description: string }) => {
  // 1. Sửa lỗi cú pháp khai báo mảng và thêm nội dung tĩnh cho Shipping
  const DROPDOWN_DATA = [
    {
      label: "Description",
      content: description,
    },
    {
      label: "Shipping & Return",
      content: "Free shipping on orders over $99. Easy 30-day return policy.", // Nội dung tĩnh ví dụ
    },
  ];

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  return (
    <div className={styles.sidebar}>
      {/* 2. Sửa logic map: Destructure { label, content } từ từng item */}
      {DROPDOWN_DATA.map(({ label, content }) => (
        <DropdownSection
          key={label}
          label={label}
          isOpen={openDropdown === label}
          onToggle={() => toggleDropdown(label)}
        >
          {/* 3. Hiển thị content tương ứng của từng tab */}
          <div
            className={styles.tabContent}
            style={{ whiteSpace: "pre-line", color: "#666", lineHeight: "1.6" }}
          >
            {content}
          </div>
        </DropdownSection>
      ))}
    </div>
  );
};

export default ProductDetailsTabs;
