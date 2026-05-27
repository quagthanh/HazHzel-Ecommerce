import styles from "@/components/layout/public/client-listing-layout/listing-layout.module.scss";
import FilterSidebar from "@/components/common/customer/filter-sidebar.tsx";
import { getCategory } from "@/services/category.api";
import { getSupplier } from "@/services/supplier.api";
import { getProducts } from "@/services/product.api";
import { getNavMetadata } from "@/services/dynamicNavigation.api";

const ListingLayout = async ({ children }: { children: React.ReactNode }) => {
  let colorFilter: any[] = [];
  let sizeFilter: any[] = [];
  const prices: number[] = [];

  let productTypePromise = getNavMetadata();
  let brandPromise = getSupplier();
  let productPromise = getProducts({});

  const [resultCategoryName, resultSupplierName, resultProduct] =
    await Promise.allSettled([
      productTypePromise,
      brandPromise,
      productPromise,
    ]);

  let productTypeName: any[] = [];
  let brandName: any[] = [];
  let productList: any[] = [];

  if (resultCategoryName.status == "fulfilled") {
    const res = resultCategoryName.value;
    if (res?.data) {
      productTypeName = res?.data;
    }
  } else {
    console.error(
      "Error when fetch value of product type's name:",
      resultCategoryName.reason,
    );
  }
  if (resultSupplierName.status == "fulfilled") {
    const res = resultSupplierName.value;

    if (res?.data) {
      brandName = res?.data?.result;
    }
  } else {
    console.error(
      "Error when fetch value of brand's name :",
      resultSupplierName.reason,
    );
  }

  if (resultProduct.status == "fulfilled") {
    const res = resultProduct.value;

    if (res?.data) {
      productList = res?.data?.result;
    }
  } else {
    console.error(
      "Error when fetch value of product data :",
      resultProduct.reason,
    );
  }

  for (const item of productList) {
    const variantList = item?.variants?.attributes ?? [];
    for (const attributeItem of variantList) {
      if (attributeItem.k == "Color") {
        colorFilter.push(attributeItem.v);
      } else if (attributeItem.k == "Size") {
        sizeFilter.push(attributeItem.v);
      }
    }
  }
  const data_filter_bar = {
    productTypeName,
    brandName,
    sizeFilter,
    colorFilter,
    prices,
  };
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <FilterSidebar filter_config={data_filter_bar} />
      </aside>
      <section className={styles.content}>{children}</section>
    </div>
  );
};
export default ListingLayout;
