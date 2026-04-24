import ProductListClient from "@/components/common/admin/product/product-list/product.list";
import { getCategory } from "@/services/category.api";
import { getProductsForAdmin } from "@/services/product.api";
import { getSupplier } from "@/services/supplier.api";
import { AdminPageProps } from "@/types/product";
const ProductListPage = async ({ searchParams }: AdminPageProps) => {
  const current = Number(searchParams?.current) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;

  let products = [];
  let categoryName: any = getCategory();
  let supplierName: any = getSupplier();
  const [resultCategoryName, resultSupplierName] = await Promise.allSettled([
    categoryName,
    supplierName,
  ]);

  if (resultCategoryName.status == "fulfilled") {
    const res = resultCategoryName.value;
    if (res?.data) {
      categoryName = res?.data?.result;
    }
  } else {
    console.error(
      "Error when fetch value of category :",
      resultCategoryName.reason,
    );
  }
  if (resultSupplierName.status == "fulfilled") {
    const res = resultSupplierName.value;

    if (res?.data) {
      supplierName = res?.data?.result;
    }
  } else {
    console.error(
      "Error when fetch value of supplier :",
      resultSupplierName.reason,
    );
  }
  let meta = { current: 1, pageSize: 10, total: 0, pages: 0 };
  try {
    const res = await getProductsForAdmin({
      current,
      pageSize,
    });
    const backendData = res?.data;
    if (backendData) {
      products = backendData.result || [];
      meta = backendData.meta || meta;
    } else {
      console.error(" API return 200 but can not find key 'data.data'");
    }
  } catch (error: any) {
    console.error("Error when call API Product:", error?.message);
  }
  return (
    <ProductListClient
      initialData={products}
      initialMeta={meta}
      category={categoryName}
      supplier={supplierName}
    />
  );
};

export default ProductListPage;
