"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Pagination, Spin } from "antd";
import { useTransition } from "react";
import TitleHeaderCenter from "@/components/common/customer/title-center";
import FilterBar from "@/components/common/customer/filter-bar";
import ProductGrid from "@/components/common/customer/product-grid";
import styles from "@/components/layout/public/client-listing-layout/listing-store-layout/listing-store-layout.module.scss";
import { ListingClientProps } from "@/types/product";

export default function ListingCategoryClient({
  banner,
  title,
  initialProducts,
  initialMeta,
}: ListingClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const products = initialProducts;
  const meta = initialMeta;

  const onPageChange = (page: number, size: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("current", page.toString());
    params.set("pageSize", size.toString());

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <>
      <TitleHeaderCenter banner={banner} title={title} />
      <FilterBar />

      <div className={styles.wrapper}>
        <Spin spinning={isPending} size="large" tip="Loading products...">
          <ProductGrid products={products} />

          {products.length > 0 && (
            <div className={styles.pagination}>
              <Pagination
                current={meta.current}
                pageSize={meta.pageSize}
                total={meta.total}
                onChange={onPageChange}
                showSizeChanger
              />
            </div>
          )}

          {products.length === 0 && !isPending && (
            <div style={{ textAlign: "center", padding: "50px" }}>
              No products found.
            </div>
          )}
        </Spin>
      </div>
    </>
  );
}
