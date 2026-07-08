"use client";

import { Select, Typography } from "antd";
import { Activity } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const { Title, Text } = Typography;

const DashboardHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentDays = searchParams.get("days") || "30";

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("days", value);

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <div>
        <Title
          level={3}
          style={{ margin: 0, color: "#1f2937", fontWeight: 700 }}
        >
          Store Overview
        </Title>
        <Text style={{ color: "#6b7280", fontSize: "14px" }}>
          Welcome back! Here&apos;s what&apos;s happening with your store today.
        </Text>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Select
          value={currentDays}
          onChange={handleFilterChange}
          style={{ width: 150 }}
          options={[
            { value: "7", label: "Last 7 days" },
            { value: "30", label: "Last 30 days" },
            { value: "90", label: "Last 90 days" },
            { value: "365", label: "This year" },
          ]}
        />

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            color: "#10b981",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          <Activity size={14} />
          Store Online
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
