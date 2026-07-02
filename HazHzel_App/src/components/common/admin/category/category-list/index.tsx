"use client";

import { Table, TableProps, Spin } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ICategory } from "@/types/interface";
import PageHeader from "../../page-header";
import FilterBar from "../../filter-bar";
import PaginationInfo from "../../pagination-info";
import { getCategoryColumns } from "../category-columns";
import { deleteCategory } from "@/services/category.api";
import CategoryCreateModal from "../category-modal/category-create-modal";
import CategoryEditModal from "../category-modal/category-edit-modal";
import useLoadingStore from "@/library/stores/useLoadingStore";

interface CategoryListClientProps {
  initialData: ICategory[];
  initialMeta: {
    current: number;
    pageSize: number;
    total: number;
    pages: number;
  };
  categoryOptions: any[];
}

const CategoryListClient = ({
  initialData,
  initialMeta,
  categoryOptions,
}: CategoryListClientProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { loading, setLoading } = useLoadingStore();
  const [dataUpdate, setDataUpdate] = useState<any>(null);
  const categories = initialData || [];
  const meta = initialMeta;

  useEffect(() => {
    setLoading(false);
  }, [searchParams]);

  const onChange = (pagination: any) => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set("current", pagination.current?.toString() ?? "1");
    params.set("pageSize", meta?.pageSize?.toString() ?? "10");

    const targetUrl = `${pathname}?${params.toString()}`;
    router.replace(targetUrl);
  };

  const dataSource = useMemo(
    () =>
      categories.map((s) => ({
        ...s,
        key: s._id,
      })),
    [categories],
  );

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id);
    } catch {
      setLoading(false);
    }
  };

  const handleEditCategory = (record: ICategory) => {
    setDataUpdate(record);
    setIsEditModalOpen(true);
  };

  const columns = getCategoryColumns({
    onEdit: handleEditCategory,
    onDelete: handleDeleteCategory,
  });

  const rowSelection: TableProps<ICategory>["rowSelection"] = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRows);
    },
  };

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <PageHeader
        title="Category List"
        subtitle="Manage your categories"
        breadcrumb={["Ecommerce", "Categorys"]}
        onAdd={() => setIsCreateModalOpen(true)}
        addButtonText="Add Category"
      />

      <FilterBar
        onSearch={(v) => console.log("Search:", v)}
        onFilter={() => console.log("Filter")}
      />

      <Spin spinning={loading} size="large">
        <Table
          rowSelection={{ type: "checkbox", ...rowSelection }}
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

      <CategoryCreateModal
        isOk={isCreateModalOpen}
        categoryOptions={categoryOptions}
        isCancel={() => setIsCreateModalOpen(false)}
      />

      <CategoryEditModal
        isOk={isEditModalOpen}
        isCancel={() => {
          setIsEditModalOpen(false);
          setDataUpdate(null);
        }}
        dataUpdate={dataUpdate}
        categoryOptions={categoryOptions}
      />
    </div>
  );
};

export default CategoryListClient;
