export const MASTER_FILTER_DATA = [
  {
    key: "categoryId", // Key này phải khớp với query param backend cần
    label: "Product Type",
    items: [
      { label: "Áo thun", value: "ao-thun-id" }, // Value là slug hoặc ID
      { label: "Quần", value: "quan-id" },
    ],
  },
  {
    key: "supplierId",
    label: "Brand",
    items: [
      { label: "Nike", value: "nike-id" },
      { label: "Adidas", value: "adidas-id" },
    ],
  },
  {
    key: "size",
    label: "Size",
    items: ["S", "M", "L", "XL"].map((s) => ({ label: s, value: s })),
  },
];
