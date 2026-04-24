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
  const filters = {
    current: Number(getParam(searchParams?.current)) || 1,
    pageSize: Number(getParam(searchParams?.pageSize)) || 12,
    category: getParam(searchParams?.filterCategory),
    size: getParam(searchParams?.filterSize),
    minPrice: getParam(searchParams?.minPrice),
    maxPrice: getParam(searchParams?.maxPrice),
    inStock: getParam(searchParams?.inStock),
    sort: getParam(searchParams?.sort),
  };

  let products = [];
  let meta = { current: 1, pageSize: 12, total: 0, pages: 0 };

  try {
    const res = await getProductsByStore(slug, filters);
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
