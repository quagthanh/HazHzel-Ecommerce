import SupplierListClient from "@/components/common/admin/supplier/supllier-list";
import { getSuppliersForAdmin } from "@/services/supplier.api";
import { AdminPageProps } from "@/types/product";
const SupplierListPage = async ({ searchParams }: AdminPageProps) => {
  const current = Number(searchParams?.current) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;

  let suppliers = [];
  let meta = { current: 1, pageSize: 10, total: 0, pages: 0 };
  try {
    const res = await getSuppliersForAdmin({
      current,
      pageSize,
    });
    const backendData = res?.data;
    if (backendData) {
      suppliers = backendData.result || [];
      meta = backendData.meta || meta;
    } else {
      console.error(" API return 200 but can not find key 'data.data'");
    }
  } catch (error: any) {
    console.error("Error when call API Product:", error?.message);
  }

  return <SupplierListClient initialData={suppliers} initialMeta={meta} />;
};

export default SupplierListPage;
