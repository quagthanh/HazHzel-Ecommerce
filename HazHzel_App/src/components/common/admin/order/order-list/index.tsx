"use client";

import { Table, TableProps, Spin } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import PageHeader from "../../page-header";
import FilterBar from "../../filter-bar";
import PaginationInfo from "../../pagination-info";
import { getOrderColumns } from "../order-columns";
import OrderEditModal from "../order-modal/order-edit-modal";
import useLoadingStore from "@/library/stores/useLoadingStore";
import OrderDetailModal from "../order-modal/order-detail-modal";

interface OrderListClientProps {
  initialData: any[];
  initialMeta: {
    current: number;
    pageSize: number;
    total: number;
    pages: number;
  };
}

const OrderListClient = ({
  initialData,
  initialMeta,
}: OrderListClientProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { loading, setLoading } = useLoadingStore();
  const [dataUpdate, setDataUpdate] = useState<any>(null);
  const [dataDetail, setDataDetail] = useState<any>(null);

  const orders = initialData || [];
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
      orders.map((o) => ({
        ...o,
        key: o._id,
      })),
    [orders],
  );

  const handleEditOrder = (record: any) => {
    setDataUpdate(record);
    setIsEditModalOpen(true);
  };

  const handleViewOrder = (record: any) => {
    setDataDetail(record);
    setIsDetailModalOpen(true);
  };

  const columns = getOrderColumns({
    onEdit: handleEditOrder,
    onView: handleViewOrder,
  });

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <PageHeader
        title="Order List"
        subtitle="Manage customer orders"
        breadcrumb={["Ecommerce", "Orders"]}
      />

      <FilterBar
        onSearch={(v) => console.log("Search:", v)}
        onFilter={() => console.log("Filter")}
      />

      <Spin spinning={loading} size="large">
        <Table
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

      <OrderEditModal
        isOk={isEditModalOpen}
        isCancel={() => {
          setIsEditModalOpen(false);
          setDataUpdate(null);
        }}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />

      <OrderDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setDataDetail(null);
        }}
        dataDetail={dataDetail}
      />
    </div>
  );
};

export default OrderListClient;
