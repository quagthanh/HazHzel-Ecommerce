"use client";

import { useState } from "react";
import styles from "./style.module.scss";
import { Slider, Switch, Checkbox } from "antd";
import DropdownSection from "./DropdownSection";
import { useProductFilter } from "@/utils/hooks/useProductFilter";
import { IFilterConfig } from "@/types/navbar";
import ColorFilter from "./ColorFilter";

export default function FilterSidebar({ filter_config }: IFilterConfig) {
  const productType = filter_config.productTypeName ?? [];
  const brandName = filter_config.brandName ?? [];
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

  const handleColorChange = (item: string) => {
    updateFilter("filterColor", item, true);
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
            {productType.map((item) => (
              <li key={item.slug} className={styles.filterItem}>
                <Checkbox
                  checked={isActive("filterCategory", item.slug)}
                  onChange={() => handleTypeChange(item.slug)}
                >
                  {item.name}
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
            {brandName.map((item) => (
              <li key={item.slug}>
                <Checkbox
                  checked={isActive("filterBrand", item.slug)}
                  onChange={() => handleBrandChange(item.slug)}
                >
                  {item.name}
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
          {filter_config.sizeFilter.map((item) => (
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
        label="Color"
        isOpen={openDropdown === "Color"}
        onToggle={() => toggleDropdown("Color")}
      >
        <ColorFilter
          colors={filter_config.colorFilter ?? []}
          isActive={isActive}
          onChange={handleColorChange}
        />
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
              "vi-VN",
            )}
            đ -
            {(Number(searchParams.get("maxPrice")) || 10000000).toLocaleString(
              "vi-VN",
            )}
            đ
          </div>
        </div>
      </DropdownSection>
    </div>
  );
}
