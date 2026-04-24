"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Pagination, Spin } from "antd";
import { useTransition } from "react";
import { IMasonryItem } from "@/types/collection";
import MasonryGallery from "../index";

interface IMeta {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
}

interface MasonryGalleryClientProps {
  initialItems: IMasonryItem[];
  initialMeta: IMeta;
}

export default function MasonryGalleryClient({
  initialItems,
  initialMeta,
}: MasonryGalleryClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const items = initialItems;
  const meta = initialMeta;

  const onPageChange = (page: number, size: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("current", page.toString());
    params.set("pageSize", size.toString());

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div
      style={{ paddingBottom: "40px", backgroundColor: "rgb(255, 251, 245)" }}
    >
      <div style={{ marginBottom: "40px", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textTransform: "uppercase",
            paddingTop: "20px",
          }}
        >
          ALL COLLECTIONS
        </h2>
      </div>

      <Spin spinning={isPending} size="large" tip="Loading data...">
        <MasonryGallery items={items} />

        {items.length === 0 && !isPending && (
          <div style={{ textAlign: "center", padding: "50px", color: "#666" }}>
            No items found.
          </div>
        )}

        {items.length > 0 && (
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              current={meta.current}
              pageSize={meta.pageSize}
              total={meta.total}
              onChange={onPageChange}
              showSizeChanger
              pageSizeOptions={["12", "24", "48"]}
            />
          </div>
        )}
      </Spin>
    </div>
  );
}
