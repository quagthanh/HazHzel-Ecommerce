"use client";
import Image from "next/image";
import { Form, Input, Select, Divider, Checkbox, Spin } from "antd";
import visa from "@/../public/assets/visa-removebg-preview.png";
import mastercard from "@/../public/assets/mastercard.svg";
import styles from "@/components/common/customer/checkout-form/style.module.scss";
import { useAuthStore } from "@/library/stores/useAuthStore";
import { useEffect, useState } from "react";
import { getMyAddress } from "@/services/address.api";

interface Address {
  _id: string;
  name: string;
  street: string;
  ward: string;
  city: string;
  country: string;
  zipCode: string;
  phone: string;
  typeAddress: string;
  isDefault: boolean;
}
interface CheckoutAddress {
  name: string;
  phone: string;
  street: string;
  ward: string;
  city: string;
}
interface CheckoutFormProps {
  onAddressChange?: (address: CheckoutAddress | null) => void;
}

export default function CheckoutForm({ onAddressChange }: CheckoutFormProps) {
  const [form] = Form.useForm();
  const userEmail = useAuthStore((state) => state?.userDetail?.email);
  const userName = useAuthStore((state) => state?.userDetail?.name);

  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const [selectedAddressId, setSelectedAddressId] =
    useState<string>("placeholder");
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await getMyAddress();
        if (res?.statusCode === 200 && res.data?.length > 0) {
          const def = res.data.find((a: Address) => a.isDefault) ?? res.data[0];
          setDefaultAddress(def);
        }
      } catch {
        // no addresses
      } finally {
        setLoadingAddresses(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleAddressSelect = (value: string) => {
    setSelectedAddressId(value);

    if (value === "placeholder") {
      form.resetFields();

      onAddressChange?.({
        name: "",
        phone: "",
        street: "",
        ward: "",
        city: "",
      });

      return;
    }

    if (!defaultAddress) return;

    form.setFieldsValue({
      name: defaultAddress.name,
      phone: defaultAddress.phone,
      street: defaultAddress.street,
      city: defaultAddress.city,
      ward: defaultAddress.ward,
      zipCode: defaultAddress.zipCode,
      typeAddress: defaultAddress.typeAddress,
    });

    onAddressChange?.({
      name: defaultAddress.name,
      phone: defaultAddress.phone,
      street: defaultAddress.street,
      ward: defaultAddress.ward,
      city: defaultAddress.city,
    });
  };

  const addressLabel = defaultAddress
    ? `${defaultAddress.name} - ${defaultAddress.street}, ${defaultAddress.ward}, ${defaultAddress.city}`
    : null;

  return (
    <div className={styles.checkoutForm}>
      <div className={styles.expressCheckout}>
        <div className={styles.wrapper}>
          <button
            className={styles.expressBtn}
            style={{ backgroundColor: "#9aa5e4ff" }}
          >
            <Image src={visa} alt="Visa" width={100} height={60} />
          </button>
          <button
            className={styles.expressBtn}
            style={{ backgroundColor: "#944b4bff" }}
          >
            <Image src={mastercard} alt="Mastercard" width={100} height={60} />
          </button>
        </div>
      </div>

      <Divider>OR</Divider>

      <div className={styles.sectionTitle}>THÔNG TIN GIAO HÀNG</div>

      <div className={styles.userInfo}>
        <div className={styles.avatar} />
        <div className={styles.userMeta}>
          <span className={styles.userName}>{userName}</span>
          <span className={styles.userEmail}>({userEmail})</span>
        </div>
        <button className={styles.logoutBtn}>Đăng xuất</button>
      </div>

      {loadingAddresses ? (
        <div className={styles.loadingWrapper}>
          <Spin size="small" /> <span>Đang tải địa chỉ...</span>
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          className={styles.form}
          onValuesChange={(_, allValues) => {
            onAddressChange?.({
              name: allValues.name || "",
              phone: allValues.phone || "",
              street: allValues.street || "",
              ward: allValues.ward || "",
              city: allValues.city || "",
            });
          }}
        >
          <Form.Item label="Choose address" className={styles.formItem}>
            <Select
              value={selectedAddressId}
              onChange={handleAddressSelect}
              className={styles.select}
            >
              <Select.Option value="placeholder">
                Choose storage location
              </Select.Option>
              {defaultAddress && (
                <Select.Option value={defaultAddress._id}>
                  {addressLabel}
                </Select.Option>
              )}
            </Select>
          </Form.Item>

          <div className={styles.row}>
            <Form.Item
              label="Name"
              name="name"
              className={styles.formItem}
              style={{ flex: 1 }}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              className={styles.formItem}
              style={{ flex: 1 }}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </div>

          <div className={styles.row}>
            <Form.Item
              label="City"
              name="city"
              className={styles.formItem}
              style={{ flex: 1 }}
            >
              <Input placeholder="Enter city" />
            </Form.Item>
            <Form.Item
              label="Ward"
              name="ward"
              className={styles.formItem}
              style={{ flex: 1 }}
            >
              <Select placeholder="Ward">
                <Select.Option value="hcm">Hồ Chí Minh</Select.Option>
                <Select.Option value="hn">Hà Nội</Select.Option>
                <Select.Option value="dn">Đà Nẵng</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className={styles.row}>
            <Form.Item
              label="Street"
              name="street"
              className={styles.formItem}
              style={{ flex: 1 }}
            >
              <Select placeholder="Street">
                <Select.Option value="q1">Quận 1</Select.Option>
                <Select.Option value="q2">Quận 2</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Zip Code"
              name="zipCode"
              className={styles.formItem}
              style={{ flex: 1 }}
            >
              <Input placeholder="Enter zip code" />
            </Form.Item>
          </div>

          <Form.Item name="typeAddress" className={styles.formItem}>
            <Checkbox.Group>
              <Checkbox value="HOMEADDRESS">Home</Checkbox>
              <Checkbox value="WORKADDRESS">Company</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      )}

      <Divider dashed />
    </div>
  );
}
