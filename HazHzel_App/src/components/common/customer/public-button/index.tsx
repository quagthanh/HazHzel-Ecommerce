import styles from "@/components/common/customer/public-button/style.module.scss";
type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "danger";
  changeColor?: boolean;
  children: React.ReactNode;
};
const CustomButton = ({
  className = "",
  variant = "primary",
  changeColor = false,
  children,
  ...rest
}: CustomButtonProps) => {
  return (
    <button
      {...rest}
      className={`${styles.customBtn} ${changeColor ? styles.changeColor : ""}`}
    >
      {children}
    </button>
  );
};
export default CustomButton;
