"use client";
import styles from "@/components/common/customer/payment-option/style.module.scss";
import Image from "next/image";
const PaymentOptions = () => {
  return (
    <>
      <button className={styles.shopPay}>
        Buy with{" "}
        <Image
          width={30}
          height={30}
          src="/assets/visa-removebg-preview.png"
          alt="Shop Pay"
        />
      </button>
      <a className={styles.morePayment} href="#">
        More payment options
      </a>
    </>
  );
};
export default PaymentOptions;
