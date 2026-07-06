"use client";

import { Table, TableProps, Spin } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ISupplier } from "@/types/interface";
import PageHeader from "../../page-header";
import FilterBar from "../../filter-bar";
import PaginationInfo from "../../pagination-info";
import { deleteSupplierForAdmin } from "@/services/supplier.api";
import { getSupplierColumns } from "../supplier-columns";

import SupplierCreateModal from "../order-modal/supplier-create-modal";
import SupplierEditModal from "../order-modal/order-edit-modal";
import useLoadingStore from "@/library/stores/useLoadingStore";

interface SupplierListClientProps {
  initialData: ISupplier[];
  initialMeta: {
    current: number;
    pageSize: number;
    total: number;
    pages: number;
  };
}

const SupplierListClient = ({
  initialData,
  initialMeta,
}: SupplierListClientProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { loading, setLoading } = useLoadingStore();
  const [dataUpdate, setDataUpdate] = useState<any>(null);
  const suppliers = initialData || [];
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
      suppliers.map((s) => ({
        ...s,
        key: s._id,
      })),
    [suppliers],
  );

  const handleDeleteSupplier = async (id: string) => {
    try {
      await deleteSupplierForAdmin(id);
    } catch {
      setLoading(false);
    }
  };

  const handleEditSupplier = (record: ISupplier) => {
    setDataUpdate(record);
    setIsEditModalOpen(true);
  };

  const columns = getSupplierColumns({
    onEdit: handleEditSupplier,
    onDelete: handleDeleteSupplier,
  });

  const rowSelection: TableProps<ISupplier>["rowSelection"] = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRows);
    },
  };

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <PageHeader
        title="Supplier List"
        subtitle="Manage your suppliers"
        breadcrumb={["Ecommerce", "Suppliers"]}
        onAdd={() => setIsCreateModalOpen(true)}
        addButtonText="Add Supplier"
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

      <SupplierCreateModal
        isOk={isCreateModalOpen}
        isCancel={() => setIsCreateModalOpen(false)}
      />

      <SupplierEditModal
        isOk={isEditModalOpen}
        isCancel={() => {
          setIsEditModalOpen(false);
          setDataUpdate(null);
        }}
        dataUpdate={dataUpdate}
        setDataUpdate
      />
    </div>
  );
};

export default SupplierListClient;
