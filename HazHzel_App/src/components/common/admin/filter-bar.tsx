"use client";
import { Input, Select, Button } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";

interface FilterBarProps {
  onSearch?: (value: string) => void;
  onFilter?: () => void;
  selectOptions?: { value: string; label: string }[];
}

const FilterBar = ({ onSearch, onFilter, selectOptions }: FilterBarProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        gap: 16,
      }}
    >
      <Input
        placeholder="Search for ..."
        prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
        onChange={(e) => onSearch?.(e.target.value)}
        style={{ maxWidth: 300 }}
      />

      <div style={{ display: "flex", gap: 12 }}>
        <Select
          placeholder="Select"
          style={{ minWidth: 150 }}
          options={selectOptions}
        />
        <Button icon={<FilterOutlined />} onClick={onFilter}>
          Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
