import React from "react";
import styles from "./style.module.scss";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

interface Props {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function DropdownSection({
  label,
  isOpen,
  onToggle,
  children,
}: Readonly<Props>) {
  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownHeader} onClick={onToggle}>
        <h4>{label.toUpperCase()}</h4>
        <span>
          {isOpen ? (
            <UpOutlined style={{ fontSize: "10px" }} />
          ) : (
            <DownOutlined style={{ fontSize: "10px" }} />
          )}
        </span>
      </div>
      <div className={`${styles.dropdownContent} ${isOpen ? styles.open : ""}`}>
        {children}
      </div>
    </div>
  );
}
