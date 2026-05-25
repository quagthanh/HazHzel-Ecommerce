"use client";

import { useMemo, useState } from "react";
import styles from "./style.module.scss";
import { Slider, Switch, Checkbox, Tree, TreeDataNode } from "antd";
import DropdownSection from "./DropdownSection";
import { useProductFilter } from "@/utils/hooks/useProductFilter";
import { IFilterConfig } from "@/types/navbar";
import ColorFilter from "./ColorFilter";

export default function FilterSidebar({ filter_config }: IFilterConfig) {
  const productType = filter_config.productTypeName ?? [];
  const brandName = filter_config.brandName ?? [];
  const sizeFilter = new Set(filter_config.sizeFilter) ?? [];
  const [openDropdown, setOpenDropdown] = useState<string | null>("Price");
  const { updateFilter, updateParams, searchParams, pathname } =
    useProductFilter();

  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));
  const isStorePage = pathname.startsWith("/stores");
  const isCategoryPage = pathname.startsWith("/categories");

  const categoryTreeData = useMemo(() => {
    // 1. Chỉ lọc ra các group MEN và WOMEN, bỏ qua BRANDS, SALE...
    const targetGroups = productType.filter(
      (group: any) => group.label === "MEN" || group.label === "WOMEN",
    );

    // 2. Hàm đệ quy map data từ API sang format của Ant Design Tree
    const mapNode = (node: any): TreeDataNode => ({
      title: node.name,
      key: node.slug, // Dùng slug làm key duy nhất để không bị trùng
      children:
        node.children && node.children.length > 0
          ? node.children.map(mapNode)
          : undefined, // undefined để ẩn icon expand nếu không có con
    });

    const treeNodes: TreeDataNode[] = [];
    targetGroups.forEach((group: any) => {
      if (group.items && group.items.length > 0) {
        group.items.forEach((item: any) => {
          treeNodes.push(mapNode(item));
        });
      }
    });

    return treeNodes;
  }, [productType]);

  const checkedCategories =
    searchParams.get("filterCategory")?.split(",").filter(Boolean) || [];

  // Xử lý khi check/uncheck vào tree node
  const handleCategoryCheck = (checkedKeysValue: any) => {
    // antd tree trả về mảng các key (slug) được check
    const keys = Array.isArray(checkedKeysValue)
      ? checkedKeysValue
      : checkedKeysValue.checked;

    // Cập nhật lại toàn bộ params bằng updateParams thay vì updateFilter toggle
    // Nếu mảng rỗng thì truyền "" để xoá param đó khỏi URL
    updateParams([
      { key: "filterCategory", value: keys.length > 0 ? keys.join(",") : "" },
    ]);
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
          <div className={styles.treeWrapper}>
            <Tree
              checkable
              defaultExpandAll
              treeData={categoryTreeData}
              checkedKeys={checkedCategories}
              onCheck={handleCategoryCheck}
              checkStrictly={false}
            />
          </div>
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
          {[...sizeFilter].map((item) => (
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
