"use client";

import { Table, TableProps, Spin } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ICollection } from "@/types/interface";
import PageHeader from "../../page-header";
import FilterBar from "../../filter-bar";
import PaginationInfo from "../../pagination-info";
import { getCollectionColumns } from "../collection-columns";
import CollectionEditModal from "../collection-modal/collection-edit-modal";
import CollectionCreateModal from "../collection-modal/collection-create-modal";
import { deleteCollection } from "@/services/collection.api";

interface CollectionListClientProps {
  initialData: ICollection[];
  initialMeta: {
    current: number;
    pageSize: number;
    total: number;
    pages: number;
  };
}

const CollectionListClient = ({
  initialData,
  initialMeta,
}: CollectionListClientProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<any>(null);
  const collections = initialData || [];
  const meta = initialMeta;

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
      collections.map((c) => ({
        ...c,
        key: c._id,
      })),
    [collections],
  );

  const handleDeleteCollection = async (id: string) => {
    try {
      await deleteCollection(id);
    } catch {
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 0);
      setIsLoading(false);
    }
  };

  const handleEditCollection = (record: ICollection) => {
    setDataUpdate(record);
    setIsEditModalOpen(true);
  };

  const columns = getCollectionColumns({
    onEdit: handleEditCollection,
    onDelete: handleDeleteCollection,
  });

  const rowSelection: TableProps<ICollection>["rowSelection"] = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRows);
    },
  };

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <PageHeader
        title="Collection List"
        subtitle="Manage your collections"
        breadcrumb={["Ecommerce", "Collections"]}
        onAdd={() => setIsCreateModalOpen(true)}
        addButtonText="Add Collection"
      />

      <FilterBar
        onSearch={(v) => console.log("Search:", v)}
        onFilter={() => console.log("Filter")}
      />

      <Spin spinning={isLoading} size="large">
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

      <CollectionCreateModal
        isOk={isCreateModalOpen}
        isCancel={() => setIsCreateModalOpen(false)}
      />

      <CollectionEditModal
        isOk={isEditModalOpen}
        isCancel={() => {
          setIsEditModalOpen(false);
          setDataUpdate(null);
        }}
        dataUpdate={dataUpdate}
      />
    </div>
  );
};

export default CollectionListClient;
