// app/account/addresses/AddressCard.tsx
// SERVER COMPONENT — renders a single saved address card

import { Tag } from "antd";
import styles from "./style.module.scss";
import { Address } from "@/types/account";
import { AddressActions } from "../account-adress-addressaction";

interface AddressCardProps {
  address: Address;
}

export function AddressCard({ address }: AddressCardProps) {
  const {
    firstName,
    lastName,
    streetAddress,
    apt,
    city,
    zip,
    state,
    country,
    phoneNumber,
    isDefault,
  } = address;

  return (
    <div className={styles.addressCard}>
      <div className={styles.cardHeader}>
        <span className={styles.addressName}>
          {firstName} {lastName}
        </span>
        {isDefault && (
          <Tag color="default" className={styles.defaultTag}>
            Default
          </Tag>
        )}
      </div>

      <div className={styles.addressBody}>
        <p>{streetAddress}</p>
        {apt && <p>{apt}</p>}
        <p>
          {city}, {state} {zip}
        </p>
        <p>{country}</p>
        <p>{phoneNumber}</p>
      </div>

      {/* Client component handles edit/delete interactions */}
      <AddressActions address={address} />
    </div>
  );
}
