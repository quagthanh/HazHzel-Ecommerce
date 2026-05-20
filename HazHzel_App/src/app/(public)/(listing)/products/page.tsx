import { getProducts } from "@/services/product.api";
import { ListPageProps } from "@/types/interface";
import collection_banner from "@/assets/nike_banner_collection_croped.jpg";
import ListingGenderClient from "@/components/layout/public/client-listing-layout/listing-gender-layout/listing-gender-layout";

export default async function GenderPage({ searchParams }: ListPageProps) {
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
  const filterSize = searchParams?.filterSize
    ? String(searchParams.filterSize)
    : undefined;
  const filterColor = searchParams?.filterColor
    ? String(searchParams.filterColor)
    : undefined;
  const minPrice = searchParams?.minPrice
    ? Number(searchParams.minPrice)
    : undefined;
  const maxPrice = searchParams?.maxPrice
    ? Number(searchParams.maxPrice)
    : undefined;
  let sendParams = {
    current,
    pageSize,
    gender,
    filterCategory,
    filterBrand,
    filterSize,
    filterColor,
    minPrice,
    maxPrice,
    sort,
  };
  let products = [];
  let meta = { current: 1, pageSize: 12, total: 0, pages: 0 };
  try {
    const res = await getProducts(sendParams);
    const backendData = res?.data;

    if (backendData) {
      products = backendData.result || [];
      meta = backendData.meta || meta;
    }
  } catch (error) {
    console.error("Fetch collection products error:", error);
  }

  return (
    <ListingGenderClient
      banner={collection_banner}
      initialProducts={products}
      initialMeta={meta}
    />
  );
}
