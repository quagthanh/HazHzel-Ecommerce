"use client";
import styles from "@/components/common/customer/cancel-button/style.module.scss";
import { ICancelButton } from "@/types/interface";
const CancelButton = ({ onClick, children }: ICancelButton) => {
  return (
    <>
      <button className={styles.cancelBtn} onClick={onClick}>
        {children}
      </button>
    </>
  );
};
export default CancelButton;
