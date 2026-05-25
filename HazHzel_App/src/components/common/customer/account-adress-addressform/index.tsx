"use client";
import { useState } from "react";
import { Modal, Form, Input, Select, Checkbox, Button, Row, Col } from "antd";
import styles from "./style.module.scss";
import { Address } from "@/types/account";
import { createAddress } from "@/services/address.api";

interface AddressFormModalProps {
  mode: "add";
}

interface EditAddressFormModalProps {
  mode: "edit";
  address: Address;
}

type Props = AddressFormModalProps | EditAddressFormModalProps;

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export function AddressFormModal(props: Props) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const isEdit = props.mode === "edit";

  const initialValues = isEdit
    ? {
        firstName: props.address.firstName,
        lastName: props.address.lastName,
        streetAddress: props.address.streetAddress,
        apt: props.address.apt,
        city: props.address.city,
        zip: props.address.zip,
        state: props.address.state,
        country: props.address.country,
        phoneNumber: props.address.phoneNumber,
        isDefault: props.address.isDefault,
      }
    : { country: "United States", isDefault: false };

  function handleOpen() {
    form.setFieldsValue(initialValues);
    setOpen(true);
  }

  function handleCancel() {
    form.resetFields();
    setOpen(false);
  }

  async function handleSubmit(values: any) {
    console.log("Check values after submit:", values);
    try {
      if (isEdit) {
        // Replace with your update API call
        // await updateAddress(props.address.id, values);
        console.log("Update address:", props.address.id, values);
      } else {
        const addressPayload = {
          name: values.name ?? "",
          street: values.street ?? "",
          ward: values.ward ?? "",
          city: values.city ?? "",
          zipCode: values.zipCode ?? "",
          phone: values.phone ?? "",
          typeAddress: values.typeAddress ?? "",
          isDefault: values.isDefault ?? false,
        };

        await createAddress(addressPayload);
        console.log("Create address:", values);
        console.log("Check address payload:", addressPayload);
      }
      form.resetFields();
      setOpen(false);
      // router.refresh() — call after successful API mutation to revalidate server data
    } catch {
      // Handle error
    }
  }

  return (
    <>
      {/* Trigger button — replace with your own Button component if needed */}
      <Button
        type={isEdit ? "default" : "primary"}
        onClick={handleOpen}
        className={isEdit ? styles.editButton : styles.addButton}
      >
        {isEdit ? "Edit" : "Add Address"}
      </Button>

      <Modal
        title={isEdit ? "Edit Address" : "Add Address"}
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={480}
        className={styles.addressModal}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={initialValues}
          className={styles.addressForm}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="Name*" />
          </Form.Item>
          <Form.Item
            name="street"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="Street" />
          </Form.Item>

          <Form.Item
            name="ward"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="Ward" />
          </Form.Item>

          <Form.Item name="city">
            <Select placeholder="City" showSearch>
              {US_STATES.map((s) => (
                <Select.Option key={s} value={s}>
                  {s}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="zipCode"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="Zip Code" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="Phone" />
          </Form.Item>

          <Form.Item
            name="typeAddress"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="Type Address" />
          </Form.Item>

          <Form.Item
            name="isDefault"
            rules={[{ required: true, message: "Required" }]}
            valuePropName="checked"
          >
            <Checkbox>Default</Checkbox>
          </Form.Item>

          <div className={styles.formFooter}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.saveButton}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
