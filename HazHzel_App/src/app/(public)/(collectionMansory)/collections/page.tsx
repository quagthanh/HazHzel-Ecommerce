import MasonryGalleryClient from "@/components/common/customer/masonry-gallery/masonry-gallery-client";
import { getTitleAggregation } from "@/services/titleAggregation.api";
import { IMasonryItem } from "@/types/collection";

interface SearchParams {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CollectionPage({ searchParams }: SearchParams) {
  const current = Number(searchParams?.current) || 1;
  const pageSize = Number(searchParams?.pageSize) || 12;

  let items: IMasonryItem[] = [];
  let meta = { current: 1, pageSize: 12, total: 0, pages: 0 };

  try {
    const res = await getTitleAggregation({ current, pageSize });
    if (res?.data) {
      items = res?.data?.result || [];
      meta = res?.data?.meta || meta;
    }
  } catch (error) {
    console.error("Fetch aggregation data error:", error);
  }

  return (
    <div
      className="container-wrapper"
      style={{ minHeight: "100vh", backgroundColor: "rgb(255, 251, 245)" }}
    >
      <MasonryGalleryClient initialItems={items} initialMeta={meta} />
    </div>
  );
}
