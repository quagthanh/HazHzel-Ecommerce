import styles from "./style.module.scss";
import { EmptyAddresses } from "@/components/common/customer/account-adress-emptyaddress";
import { AddressCard } from "@/components/common/customer/account-adress-addresscard";
import { AddressFormModal } from "@/components/common/customer/account-adress-addressform";
import { getMyAddress } from "@/services/address.api";

export default async function AddressesPage() {
  const res = await getMyAddress();
  const addresses = res?.data ?? [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Saved Addresses</h1>
          <p className={styles.subtitle}>Manage your delivery addresses</p>
        </div>

        {addresses.length > 0 && <AddressFormModal mode="add" />}
      </div>

      {addresses.length === 0 ? (
        <EmptyAddresses />
      ) : (
        <div className={styles.addressGrid}>
          {addresses.map((address: any) => (
            <AddressCard key={address._id} address={address} />
          ))}
        </div>
      )}
    </div>
  );
}
