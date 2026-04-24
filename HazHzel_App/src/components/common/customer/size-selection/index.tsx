"use client";
import styles from "./style.module.scss";

interface SelectorProps {
  label: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  checkDisabled?: (value: string) => boolean;
}

const SizeSelector = ({
  label,
  options,
  selected,
  onChange,
  checkDisabled,
}: SelectorProps) => {
  const isColorSelector = label.toLowerCase().includes("color");
  return (
    <div className={styles.sizeSelectorContainer}>
      <label>
        {label}: <span>{selected}</span>
      </label>

      <div className={styles.sizeOptions}>
        {options.map((option) => {
          const isActive = selected === option;
          const isDisabled = checkDisabled ? checkDisabled(option) : false;

          // --- TRƯỜNG HỢP 1: Render nút MÀU (Color) ---
          if (isColorSelector) {
            return (
              <button
                key={option}
                onClick={() => !isDisabled && onChange(option)}
                disabled={isDisabled}
                title={option} // Hover vào hiện tên màu
                className={`
                  ${styles.colorBtn} 
                  ${isActive ? styles.active : ""} 
                  ${isDisabled ? styles.disabled : ""}
                `}
                style={{
                  backgroundColor: option.toLowerCase(),
                }}
              />
            );
          }

          // --- TRƯỜNG HỢP 2: Render nút THƯỜNG (Size, Material...) ---
          return (
            <button
              key={option}
              onClick={() => !isDisabled && onChange(option)}
              disabled={isDisabled}
              className={`
                ${styles.optionBtn} 
                ${isActive ? styles.active : ""} 
                ${isDisabled ? styles.disabled : ""}
              `}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
