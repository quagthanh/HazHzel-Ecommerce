"use client";

import { useState } from "react";
import styles from "./style.module.scss";
import { Slider, Switch, Checkbox } from "antd";
import DropdownSection from "./DropdownSection";
import { useProductFilter } from "@/utils/hooks/useProductFilter";

const FILTER_CONFIG = {
  types: ["T-Shirt", "Polo", "Pants", "Shorts", "Jacket", "Accessories"],
  brands: ["Gucci", "Adidas", "Nike", "Coolmate", "OAS"],
  sizes: ["S", "M", "L", "XL", "XXL"],
  prices: [0, 10000000],
};

export default function FilterSidebar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>("Price");
  const { updateFilter, updateParams, searchParams, pathname } =
    useProductFilter();

  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));
  const isStorePage = pathname.startsWith("/stores");
  const isCategoryPage = pathname.startsWith("/categories");

  const handleTypeChange = (item: string) => {
    updateFilter("filterCategory", item, true);
  };

  const handleBrandChange = (item: string) => {
    updateFilter("filterBrand", item, true);
  };

  const handleSizeChange = (item: string) => {
    updateFilter("filterSize", item, true);
  };

  const handlePriceChange = (value: number[]) => {
    updateParams([
      { key: "minPrice", value: value[0] },
      { key: "maxPrice", value: value[1] },
    ]);
  };

  const handleStockChange = (checked: boolean) => {
    updateFilter("inStock", checked ? "true" : null);
  };
  const isActive = (key: string, value: string) => {
    const params = searchParams.get(key)?.split(",") || [];
    return params.includes(value);
  };

  return (
    <div className={styles.sidebar}>
      {!isCategoryPage && (
        <DropdownSection
          label="Product Type"
          isOpen={openDropdown === "Type"}
          onToggle={() => toggleDropdown("Type")}
        >
          <ul className={styles.dropdownList}>
            {FILTER_CONFIG.types.map((item) => (
              <li key={item} className={styles.filterItem}>
                <Checkbox
                  checked={isActive("filterCategory", item)}
                  onChange={() => handleTypeChange(item)}
                >
                  {item}
                </Checkbox>
              </li>
            ))}
          </ul>
        </DropdownSection>
      )}
      {!isStorePage && (
        <DropdownSection
          label="Brand"
          isOpen={openDropdown === "Brand"}
          onToggle={() => toggleDropdown("Brand")}
        >
          <ul className={styles.dropdownList}>
            {FILTER_CONFIG.brands.map((item) => (
              <li key={item}>
                <Checkbox
                  checked={isActive("filterBrand", item)}
                  onChange={() => handleBrandChange(item)}
                >
                  {item}
                </Checkbox>
              </li>
            ))}
          </ul>
        </DropdownSection>
      )}

      <DropdownSection
        label="Size"
        isOpen={openDropdown === "Size"}
        onToggle={() => toggleDropdown("Size")}
      >
        <ul className={styles.dropdownList}>
          {FILTER_CONFIG.sizes.map((item) => (
            <li key={item}>
              <Checkbox
                checked={isActive("filterSize", item)}
                onChange={() => handleSizeChange(item)}
              >
                {item}
              </Checkbox>
            </li>
          ))}
        </ul>
      </DropdownSection>

      <DropdownSection
        label="Price"
        isOpen={openDropdown === "Price"}
        onToggle={() => toggleDropdown("Price")}
      >
        <div className={styles.priceSort}>
          <Slider
            range
            min={0}
            max={10000000}
            step={50000}
            defaultValue={[
              Number(searchParams.get("minPrice")) || 0,
              Number(searchParams.get("maxPrice")) || 10000000,
            ]}
            onAfterChange={handlePriceChange}
          />
          <div style={{ marginTop: 10 }}>
            {(Number(searchParams.get("minPrice")) || 0).toLocaleString(
              "vi-VN"
            )}
            đ -
            {(Number(searchParams.get("maxPrice")) || 10000000).toLocaleString(
              "vi-VN"
            )}
            đ
          </div>
        </div>
      </DropdownSection>

      <DropdownSection
        label="Availability"
        isOpen={openDropdown === "Availability"}
        onToggle={() => toggleDropdown("Availability")}
      >
        <div className={styles.switchRow}>
          <Switch
            checked={searchParams.get("inStock") === "true"}
            onChange={handleStockChange}
          />
          <span>In stock only</span>
        </div>
      </DropdownSection>
    </div>
  );
}
