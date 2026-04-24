"use client";

import { Table, TableProps, Spin, Tag } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import UserEditModal from "./modals/modal-edit-user/modal.edit.user";
import UserCreateModal from "./modals/modal-create-user/modal.create.user";
import Image from "next/image";

import PageHeader from "../page-header";
import ActionMenu from "../action-menu";
import FilterBar from "../filter-bar";
import PaginationInfo from "../pagination-info";

import avt_holder from "@/assets/cool_avt.jpg";
import { handleDeleteUserForAdmin } from "@/services/user.api";
import { getUserColumns } from "./user-columns";
import { IUser } from "@/types/next-auth";
interface UserListClientProps {
  initialUsers: IUser[];
  initialMeta: {
    current: number;
    pageSize: number;
    total: number;
  };
}

const UserListClient = ({ initialUsers, initialMeta }: UserListClientProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const users = initialUsers || [];
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
    params.set("pageSize", meta.pageSize?.toString() ?? "10");
    const targetUrl = `${pathname}?${params.toString()}`;
    router.replace(targetUrl);
  };

  const dataSource = useMemo(
    () =>
      users.map((u) => ({
        ...u,
        key: u._id,
      })),
    [users],
  );

  const handleDeleteUser = async (id: string) => {
    try {
      await handleDeleteUserForAdmin(id);
    } catch {
      setIsLoading(false);
    }
  };
  const handleEditUser = (record: IUser) => {
    setDataUpdate(record);
    setIsEditModalOpen(true);
  };
  const columns = getUserColumns({
    onEdit: handleEditUser,
    onDelete: handleDeleteUser,
  });

  const rowSelection: TableProps<IUser>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IUser[]) => {
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
    <div style={{ padding: "24px", background: "#fff", minHeight: "100vh" }}>
      <PageHeader
        title="Users List"
        subtitle="Manage system users"
        breadcrumb={["Admin", "Users"]}
        onExport={() => console.log("Export")}
        onAdd={() => setIsCreateModalOpen(true)}
        addButtonText="Add User"
      />

      <FilterBar
        onSearch={(value) => console.log("Search:", value)}
        onFilter={() => console.log("Filter clicked")}
      />

      <Spin spinning={isLoading} size="large">
        <Table
          rowSelection={{ type: selectionType, ...rowSelection }}
          bordered
          dataSource={dataSource}
          columns={columns}
          rowKey="_id"
          pagination={false}
          style={{ borderRadius: 8, overflow: "hidden" }}
        />

        <PaginationInfo
          current={meta.current}
          pageSize={meta.pageSize}
          total={meta.total}
          onPageChange={(page) => {
            onChange({ current: page, pageSize: meta.pageSize });
          }}
        />
      </Spin>

      <UserCreateModal
        isOk={isCreateModalOpen}
        isCancel={() => setIsCreateModalOpen(false)}
      />
      <UserEditModal
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

export default UserListClient;
