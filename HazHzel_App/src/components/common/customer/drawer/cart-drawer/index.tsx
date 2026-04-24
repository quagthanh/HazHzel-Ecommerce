"use client";
import { Drawer, Space } from "antd";
import CancelButton from "../../cancel-button";
import CustomButton from "@/components/common/customer/public-button";
import styles from "@/components/common/customer/drawer/cart-drawer/style.module.scss";
import CartItem from "../../list-cart-item";
import { useRouter } from "next/navigation";
import { CartDrawerProps } from "@/types/interface";

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const router = useRouter();
  const handleCloseCartDrawer = () => {
    onClose();
    setTimeout(() => {
      router.push("/cart");
    }, 0);
  };
  const handleOpenCheckout = () => {
    onClose();
    setTimeout(() => {
      router.push("/checkout");
    }, 0);
  };
  return (
    <Drawer
      title={<p>CART</p>}
      placement="right"
      maskClosable={true}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          padding: "0 1.5rem",
        },
      }}
      closeIcon={false}
      style={{ backgroundColor: "rgb(255, 251, 245)" }}
      extra={
        <Space>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </Space>
      }
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <CartItem />
        </div>
        <div className={styles.drawerFooter}>
          <CustomButton onClick={handleCloseCartDrawer}>View cart</CustomButton>

          <CustomButton onClick={handleOpenCheckout}>check out</CustomButton>
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
