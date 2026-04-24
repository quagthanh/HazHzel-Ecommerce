import { FileType } from "@/types/product";

export const getParam = (
  param: string | string[] | undefined,
): string | undefined => {
  if (Array.isArray(param)) {
    return param[0];
  }
  return param;
};
export const formatPriceHelper = (price?: number) =>
  price
    ? new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price)
    : "Contact";

export const getAbsoluteUrl = (url: string) => {
  if (!url) return "/";
  if (url.startsWith("/") || url.startsWith("http")) return url;
  return `/${url}`;
};

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const getAttr = (attrs: any[], key: string) =>
  attrs?.find((a) => a.k === key)?.v;

export const buildTree = (items: any[]) => {
  if (!Array.isArray(items)) {
    console.error("buildTree expected an array, but received:", items);
    return [];
  }
  const tree: any[] = [];
  const map = new Map();

  items?.forEach((item) => {
    map.set(item._id, { ...item, children: [] });
  });

  map.forEach((item) => {
    if (item.parentCategory) {
      const parent = map.get(item.parentCategory);
      if (parent) {
        parent.children.push(item);
      } else {
        tree.push(item);
      }
    } else {
      tree.push(item);
    }
  });

  return tree;
};
