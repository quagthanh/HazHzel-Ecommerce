import ListingCollectionClient from "@/components/layout/public/client-listing-layout/listing-collection-layout/listing-collection-layout";
import { getProductsByCollection } from "@/services/product.api";
import { ListPageProps } from "@/types/interface";
import collection_banner from "@/assets/nike_banner_collection_croped.jpg";
import { getParam } from "@/utils/helper";

export default async function CollectionPage({
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
    const res = await getProductsByCollection(slug, filters);
    const backendData = res?.data;

    if (backendData) {
      products = backendData.result || [];
      meta = backendData.meta || meta;
    }
  } catch (error) {
    console.error("Fetch collection products error:", error);
  }

  return (
    <ListingCollectionClient
      banner={collection_banner}
      title={title}
      initialProducts={products}
      initialMeta={meta}
    />
  );
}
