// ColorFilter.tsx
import styles from "./style.module.scss";
import { Checkbox } from "antd";

interface Props {
  colors: string[];
  isActive: (key: string, value: string) => boolean;
  onChange: (color: string) => void;
}

export default function ColorFilter({ colors, isActive, onChange }: Props) {
  return (
    <ul className={styles.dropdownList}>
      {colors.map((color) => (
        <li key={color} className={styles.filterItem}>
          <Checkbox
            checked={isActive("filterColor", color)}
            onChange={() => onChange(color)}
          >
            <span
              style={{
                display: "inline-block",
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: color,
                border: "1px solid #ccc",
                marginRight: 6,
                verticalAlign: "middle",
              }}
            />
            {color}
          </Checkbox>
        </li>
      ))}
    </ul>
  );
}
