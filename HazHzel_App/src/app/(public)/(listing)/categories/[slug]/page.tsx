import ListingCategoryClient from "@/components/layout/public/client-listing-layout/listing-category-layout/listing-category-layout";
import { getProductsByCategory } from "@/services/product.api";
import { ListPageProps } from "@/types/interface";
import category_banner from "@/assets/categories_banner.jpg";
import { getParam } from "@/utils/helper";
export default async function CatgoryPage({
  params,
  searchParams,
}: ListPageProps) {
  const { slug } = params;
  const title = slug.replace(/-/g, " ").toUpperCase();
  const filters = {
    current: Number(getParam(searchParams?.current)) || 1,
    pageSize: Number(getParam(searchParams?.pageSize)) || 12,
    minPrice: getParam(searchParams?.minPrice),
    maxPrice: getParam(searchParams?.maxPrice),
    sort: getParam(searchParams?.sort),
    size: getParam(searchParams?.filterSize),
    brand: getParam(searchParams?.filterBrand),
  };

  let products = [];
  let meta = { current: 1, pageSize: 12, total: 0, pages: 0 };

  try {
    const res = await getProductsByCategory(slug, filters);
    const backendData = res?.data;

    if (backendData) {
      products = backendData.result || [];
      meta = backendData.meta || meta;
    }
  } catch (error) {
    console.error("Fetch store products error:", error);
  }

  return (
    <ListingCategoryClient
      banner={category_banner}
      title={title}
      initialProducts={products}
      initialMeta={meta}
    />
  );
}
