import { AddressFormModal } from "../account-adress-addressform";
import styles from "./style.module.scss";

export function EmptyAddresses() {
  return (
    <div className={styles.emptyState}>
      <p className={styles.emptyText}>
        You currently don&apos;t have any saved delivery addresses.
        <br />
        Add an address here to be prefilled for quicker checkout.
      </p>
      <AddressFormModal mode="add" />
    </div>
  );
}
