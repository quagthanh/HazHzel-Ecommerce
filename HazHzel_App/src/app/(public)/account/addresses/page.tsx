import styles from "./style.module.scss";
import { Address } from "@/types/account";
import { EmptyAddresses } from "@/components/common/customer/account-adress-emptyaddress";
import { AddressCard } from "@/components/common/customer/account-adress-addresscard";
import { AddressFormModal } from "@/components/common/customer/account-adress-addressform";
import { getAddress } from "@/services/address.api";

export default async function AddressesPage() {
  const res = await getAddress();
  const addresses: any[] = res?.data ?? [];
  console.log("Check res addressPage:", res);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Saved Delivery Addresses</h1>
        {/* Always show the Add button when there are addresses */}
        {addresses.length > 0 && <AddressFormModal mode="add" />}
      </div>

      {addresses.length === 0 ? (
        <EmptyAddresses />
      ) : (
        <div className={styles.addressGrid}>
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
      )}
    </div>
  );
}
