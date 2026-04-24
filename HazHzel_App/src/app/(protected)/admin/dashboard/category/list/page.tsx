import CategoryListClient from "@/components/common/admin/category/category-list";
import { getCategoriesForAdmin, getCategory } from "@/services/category.api";
import { AdminPageProps } from "@/types/product";

const CategoryListPage = async ({ searchParams }: AdminPageProps) => {
  const current = Number(searchParams?.current) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;

  let categories = [];
  let categoryOptions = [];
  let meta = { current: 1, pageSize: 10, total: 0, pages: 0 };

  try {
    const res = await getCategoriesForAdmin({
      current,
      pageSize,
    });

    const backendData = res?.data;

    if (backendData) {
      categories = backendData.result || [];
      meta = backendData.meta || meta;
    } else {
      console.error("API return 200 but cannot find key 'data.data'");
    }
  } catch (error: any) {
    console.error("Error when call API Category:", error?.message);
  }

  try {
    const res = await getCategory({
      current,
      pageSize,
    });

    const backendData = res?.data;
    if (backendData) {
      categoryOptions = backendData.result || [];
      meta = backendData.meta || meta;
    } else {
      console.error("API return 200 but cannot find key 'data.data'");
    }
  } catch (error: any) {
    console.error("Error when call API Category:", error?.message);
  }

  return (
    <CategoryListClient
      categoryOptions={categoryOptions}
      initialData={categories}
      initialMeta={meta}
    />
  );
};

export default CategoryListPage;
