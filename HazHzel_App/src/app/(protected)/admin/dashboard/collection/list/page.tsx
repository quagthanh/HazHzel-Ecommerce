import CollectionListClient from "@/components/common/admin/collection/collection-list";
import { getCollectionsForAdmin } from "@/services/collection.api";
import { AdminPageProps } from "@/types/product";
const CollectionListPage = async ({ searchParams }: AdminPageProps) => {
  const current = Number(searchParams?.current) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;

  let collections = [];
  let meta = { current: 1, pageSize: 10, total: 0, pages: 0 };
  try {
    const res = await getCollectionsForAdmin({
      current,
      pageSize,
    });
    const backendData = res?.data;
    if (backendData) {
      collections = backendData.result || [];
      meta = backendData.meta || meta;
    } else {
      console.error(" API return 200 but can not find key 'data.data'");
    }
  } catch (error: any) {
    console.error("Error when call API Collection:", error?.message);
  }

  return <CollectionListClient initialData={collections} initialMeta={meta} />;
};

export default CollectionListPage;
