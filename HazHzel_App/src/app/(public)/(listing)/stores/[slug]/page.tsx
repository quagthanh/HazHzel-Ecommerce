import ListingStoreClient from "@/components/layout/public/client-listing-layout/listing-store-layout/listing-store-layout";
import { getProductsByStore } from "@/services/product.api"; // Import hàm mới
import { ListPageProps } from "@/types/interface";
import store_banner from "@/assets/store-banner.png";
import { getParam } from "@/utils/helper";

export default async function StorePage({
  params,
  searchParams,
}: ListPageProps) {
  const { slug } = params;
  const title = slug.replace(/-/g, " ").toUpperCase();
  const current = Number(searchParams?.current) || 1;
  const pageSize = Number(searchParams?.pageSize) || 12;
  const gender = searchParams?.gender
    ? String(searchParams?.gender)
    : undefined;
  const filterCategory = searchParams?.filterCategory
    ? String(searchParams?.filterCategory)
    : undefined;
  const filterBrand = searchParams?.filterBrand
    ? String(searchParams?.filterBrand)
    : undefined;
  const sort = searchParams?.sort ? String(searchParams?.sort) : undefined;
  let sendParams = {
    current,
    pageSize,
    gender,
    filterCategory,
    filterBrand,
    // filterSize,
    // minPrice,
    // maxPrice,
    // availabilit,
    sort,
  };
  let products = [];
  let meta = { current: 1, pageSize: 12, total: 0, pages: 0 };

  try {
    const res = await getProductsByStore(slug, sendParams);
    const backendData = res?.data;
    if (backendData) {
      products = backendData.result || [];
      meta = backendData.meta || meta;
    }
  } catch (error) {
    console.error("Fetch store products error:", error);
  }
  return (
    <ListingStoreClient
      banner={store_banner}
      title={title}
      initialProducts={products}
      initialMeta={meta}
    />
  );
}
