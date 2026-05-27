"use client";
import { useState } from "react";
import { Button, Popconfirm } from "antd";
import styles from "./style.module.scss";
import { Address } from "@/types/account";
import { AddressFormModal } from "../account-adress-addressform";

interface AddressActionsProps {
  address: Address;
}

export function AddressActions({ address }: AddressActionsProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      // Replace with your delete API call
      // await deleteAddress(address.id);
      // router.refresh() — call after successful delete to revalidate server data
    } catch {
      // Handle error
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className={styles.cardActions}>
      {/* Edit — opens AddressFormModal in edit mode */}
      <AddressFormModal mode="edit" address={address} />

      {/* Delete with confirmation */}
      <Popconfirm
        title="Remove this address?"
        description="This action cannot be undone."
        onConfirm={handleDelete}
        okText="Remove"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <Button
          type="text"
          danger
          loading={deleting}
          className={styles.deleteButton}
        >
          Remove
        </Button>
      </Popconfirm>
    </div>
  );
}
