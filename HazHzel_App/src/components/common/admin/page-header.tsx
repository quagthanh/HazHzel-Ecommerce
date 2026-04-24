"use client";
import { Button } from "antd";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string[];
  onExport?: () => void;
  onAdd?: () => void;
  addButtonText?: string;
}

const PageHeader = ({
  title,
  subtitle,
  breadcrumb,
  onExport,
  onAdd,
  addButtonText = "Add",
}: PageHeaderProps) => {
  return (
    <div style={{ marginBottom: 24 }}>
      {/* Breadcrumb */}
      {breadcrumb && breadcrumb.length > 0 && (
        <div
          style={{
            fontSize: 12,
            color: "#8c8c8c",
            marginBottom: 8,
            textAlign: "right",
          }}
        >
          {breadcrumb.join(" > ")}
        </div>
      )}

      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 8,
        }}
      >
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>{title}</h1>
          {subtitle && (
            <p style={{ fontSize: 14, color: "#8c8c8c", margin: "4px 0 0" }}>
              {subtitle}
            </p>
          )}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {onExport && (
            <Button icon={<DownloadOutlined />} onClick={onExport}>
              Export
            </Button>
          )}
          {onAdd && (
            <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
              {addButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
