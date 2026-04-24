"use client";

import { Table, TableProps, Spin, Tooltip } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

import { IProduct } from "@/types/interface";
import ActionMenu from "../../action-menu";
import PageHeader from "../../page-header";
import FilterBar from "../../filter-bar";
import PaginationInfo from "../../pagination-info";
import ProductCreateModal from "../product-modal/product-create-modal";
import ProductEditModal from "../product-modal/product-edit-modal";
import { deleteProductsForAdmin } from "@/services/product.api";
import { getProductColumns } from "../product-columns";

interface ProductListClientProps {
  initialData: IProduct[];
  initialMeta: {
    current: number;
    pageSize: number;
    total: number;
    pages: number;
  };
  category: any;
  supplier: any;
}

const ProductListClient = ({
  initialData,
  initialMeta,
  category,
  supplier,
}: ProductListClientProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const products = initialData || [];
  const meta = initialMeta;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<any>(null);

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  const onChange = (pagination: any) => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set("current", pagination.current?.toString() ?? "1");
    params.set("pageSize", meta?.pageSize?.toString() ?? "10");
    const targetUrl = `${pathname}?${params.toString()}`;
    router.replace(targetUrl);
  };
  const dataSource = useMemo(
    () =>
      products.map((p) => ({
        ...p,
        key: p._id,
      })),
    [products],
  );

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProductsForAdmin(id);
    } catch {
      setIsLoading(false);
    }
  };

  const handleEditProduct = (record: IProduct) => {
    setDataUpdate(record);
    setIsEditModalOpen(true);
  };

  const columns = getProductColumns({
    onEdit: handleEditProduct,
    onDelete: handleDeleteProduct,
  });
  const rowSelection: TableProps<IProduct>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IProduct[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows,
      );
    },
  };
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox",
  );

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <PageHeader
        title="Products List"
        subtitle="Manage your store products"
        breadcrumb={["Admin", "Products"]}
        onAdd={() => setIsCreateModalOpen(true)}
        addButtonText="Add Product"
      />

      <FilterBar
        onSearch={(v) => console.log("Search:", v)}
        onFilter={() => console.log("Filter")}
      />

      <Spin spinning={isLoading} size="large">
        <Table
          rowSelection={{ type: selectionType, ...rowSelection }}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowKey="_id"
        />

        <PaginationInfo
          current={meta.current}
          pageSize={meta.pageSize}
          total={meta.total}
          onPageChange={(page) =>
            onChange({ current: page, pageSize: meta.pageSize })
          }
        />
      </Spin>
      <ProductCreateModal
        isOk={isCreateModalOpen}
        isCancel={() => setIsCreateModalOpen(false)}
        category={category}
        supplier={supplier}
      />
      <ProductEditModal
        dataUpdate={dataUpdate}
        isOk={isEditModalOpen}
        isCancel={() => {
          setIsEditModalOpen(false);
          setDataUpdate(null);
        }}
        category={category}
        supplier={supplier}
      />
    </div>
  );
};

export default ProductListClient;
