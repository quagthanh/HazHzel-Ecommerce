"use client";
import { Button, InputNumber } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Select } from "antd";
interface PaginationInfoProps {
  current: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

const PaginationInfo = ({
  current,
  pageSize,
  total,
  onPageChange,
}: PaginationInfoProps) => {
  const [jumpPage, setJumpPage] = useState<number | null>(null);

  const totalPages = Math.ceil(total / pageSize);
  const startIndex = total === 0 ? 0 : (current - 1) * pageSize + 1;
  const endIndex = Math.min(current * pageSize, total);

  const handleJump = () => {
    if (!jumpPage) return;

    const page = Math.max(1, Math.min(jumpPage, totalPages));
    onPageChange(page);
    setJumpPage(null);
  };

  const renderPageNumbers = () => {
    const pages: JSX.Element[] = [];
    const delta = 1;

    const rangeStart = Math.max(2, current - delta);
    const rangeEnd = Math.min(totalPages - 1, current + delta);

    // first
    pages.push(
      <Button
        key={1}
        type={current === 1 ? "primary" : "default"}
        onClick={() => onPageChange(1)}
        style={{ minWidth: 32, height: 32 }}
      >
        1
      </Button>,
    );

    // left ...
    if (rangeStart > 2) {
      pages.push(
        <span key="left-ellipsis" style={{ padding: "0 8px" }}>
          ...
        </span>,
      );
    }

    // middle
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(
        <Button
          key={i}
          type={i === current ? "primary" : "default"}
          onClick={() => onPageChange(i)}
          style={{ minWidth: 32, height: 32 }}
        >
          {i}
        </Button>,
      );
    }

    // right ...
    if (rangeEnd < totalPages - 1) {
      pages.push(
        <span key="right-ellipsis" style={{ padding: "0 8px" }}>
          ...
        </span>,
      );
    }

    // last
    if (totalPages > 1) {
      pages.push(
        <Button
          key={totalPages}
          type={current === totalPages ? "primary" : "default"}
          onClick={() => onPageChange(totalPages)}
          style={{ minWidth: 32, height: 32 }}
        >
          {totalPages}
        </Button>,
      );
    }

    return pages;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16,
        padding: "12px 0",
      }}
    >
      {/* info */}
      <div style={{ fontSize: 14, color: "#595959" }}>
        Showing {startIndex} - {endIndex} of {total} Results
      </div>

      {/* controls */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Button
          icon={<LeftOutlined />}
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
          style={{ minWidth: 32, height: 32 }}
        >
          Prev
        </Button>

        {renderPageNumbers()}

        <Button
          onClick={() => onPageChange(current + 1)}
          disabled={current === totalPages}
          style={{ minWidth: 32, height: 32 }}
        >
          Next
          <RightOutlined />
        </Button>

        {/* Jump to page */}
        {totalPages > 1 && (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span>Page</span>
            <Select
              value={current}
              style={{ width: 90 }}
              onChange={(page) => onPageChange(page)}
              options={Array.from({ length: totalPages }, (_, i) => ({
                label: i + 1,
                value: i + 1,
              }))}
              showSearch
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginationInfo;
