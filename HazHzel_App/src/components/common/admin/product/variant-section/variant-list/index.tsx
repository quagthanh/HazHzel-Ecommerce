"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Table,
  Space,
  Popconfirm,
  message,
  Image,
  Tag,
  Tooltip,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getVariantsByProductId, deleteVariant } from "@/services/variant.api";
import { IProductVariant } from "@/types/interface";
import VariantModal from "../variant-modal";

interface VariantListProps {
  productId: string;
}

const VariantList = ({ productId }: VariantListProps) => {
  const [variants, setVariants] = useState<IProductVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<IProductVariant | null>(
    null,
  );
  const fetchVariants = async () => {
    try {
      setLoading(true);
      const res = await getVariantsByProductId(productId);
      setVariants(Array.isArray(res?.data) ? res?.data : []);
    } catch (error) {
      message.error("Failed to load variants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchVariants();
    }
  }, [productId]);

  const handleDelete = async (id: string) => {
    try {
      await deleteVariant(id);
      message.success("Deleted variant");
      await fetchVariants();
    } catch {
      message.error("Delete failed");
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      width: 80,
      render: (images: any[]) => {
        const url = images?.[0]?.secure_url || images?.[0]?.url || images?.[0];
        return url ? (
          <Image
            src={url}
            width={40}
            height={40}
            style={{ objectFit: "cover", borderRadius: 4 }}
          />
        ) : (
          "-"
        );
      },
    },
    {
      title: "Name / SKU",
      render: (_: any, r: IProductVariant) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.name}</div>
          <div style={{ fontSize: 12, color: "#666" }}>{r.sku}</div>
        </div>
      ),
    },
    {
      title: "Attributes",
      dataIndex: "attributes",
      render: (attrs: any[]) => (
        <Space wrap>
          {attrs?.map((a, idx) => (
            <Tag key={idx} color="geekblue">
              {a.k}: {a.v}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Price",
      dataIndex: "currentPrice",
      render: (p: number) => (
        <span style={{ color: "#d48806" }}>{p?.toLocaleString("vi-VN")} đ</span>
      ),
    },
    {
      title: "Stock",
      render: (_: any, r: IProductVariant) => r.stock ?? 0,
    },
    {
      title: "Action",
      width: 100,
      render: (_: any, record: IProductVariant) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => {
                setCurrentVariant(record);
                setIsModalOpen(true);
              }}
            />
          </Tooltip>
          <Popconfirm
            title="Delete variant?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ marginTop: 10 }}>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Variant List</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setCurrentVariant(null);
            setIsModalOpen(true);
          }}
        >
          Add Variant
        </Button>
      </div>

      <Table
        dataSource={variants}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={false}
        bordered
        size="small"
      />

      <VariantModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onReload={fetchVariants} // reload local
        productId={productId}
        dataUpdate={currentVariant}
      />
    </div>
  );
};

export default VariantList;
