import { Tag } from "antd";
import styles from "./style.module.scss";
import { Address } from "@/types/account";
import { AddressActions } from "../account-adress-addressaction";

interface AddressCardProps {
  address: Address;
}

export function AddressCard({ address }: AddressCardProps) {
  const { name, street, ward, city, zipCode, phone, isDefault } = address;

  return (
    <div className={styles.addressCard}>
      <div className={styles.cardHeader}>
        <div className={styles.userInfo}>
          <span className={styles.addressName}>{name}</span>

          {isDefault && <Tag className={styles.defaultTag}>Default</Tag>}
        </div>

        <span className={styles.phone}>{phone}</span>
      </div>

      <div className={styles.addressBody}>
        <p>{street}</p>

        <p>
          {ward}, {city}
        </p>

        <p>{zipCode}</p>
      </div>

      <div className={styles.actionWrapper}>
        <AddressActions address={address} />
      </div>
    </div>
  );
}
