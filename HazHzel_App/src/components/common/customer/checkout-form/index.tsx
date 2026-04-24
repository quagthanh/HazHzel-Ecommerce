"use client";
import Image from "next/image";
import { Form, Input, Select, Radio, Divider, Space, Popconfirm } from "antd";
import visa from "@/../public/assets/visa-removebg-preview.png";
import mastercard from "@/../public/assets/mastercard.svg";
import { MoreOutlined } from "@ant-design/icons";
import styles from "@/components/common/customer/checkout-form/style.module.scss";
import { useAuthStore } from "@/library/stores/useAuthStore";
export default function CheckoutForm() {
  const [form] = Form.useForm();
  const text = "Do you sure to log out?";

  const userEmail = useAuthStore((state) => state?.userDetail?.email);
  return (
    <div className={styles.checkoutForm}>
      <div className={styles.expressCheckout}>
        <div className={styles.wrapper}>
          <button
            className={styles.expressBtn}
            style={{ backgroundColor: "#9aa5e4ff" }}
          >
            <Image src={visa} alt="Shop Pay" width={100} height={60} />
          </button>

          <button
            className={styles.expressBtn}
            style={{ backgroundColor: "#944b4bff" }}
          >
            <Image src={mastercard} alt="Google Pay" width={100} height={60} />
          </button>
        </div>
      </div>
      <Divider>OR</Divider>
      <div className={styles.emailSection}>
        <div className={styles.emailTittle}>
          <p>{userEmail}</p>
        </div>
        <div>
          <Popconfirm
            placement="bottom"
            title={text}
            okText="Log out"
            cancelText="No"
          >
            <MoreOutlined />
          </Popconfirm>
        </div>
      </div>
      <div className={styles.deliverySection}>
        <h3>Delivery</h3>
        <Radio.Group defaultValue="ship" style={{ width: "100%" }}>
          <Radio value="ship" className={styles.deliveryOption}>
            Ship
          </Radio>
          <Radio value="click" className={styles.deliveryOption}>
            Click & Collect (FREE)
          </Radio>
        </Radio.Group>
      </div>
      <Form form={form} layout="vertical" className={styles.form}>
        <Form.Item name="country" label="Country/Region" initialValue="Vietnam">
          <Select>
            <Select.Option value="Vietnam">Vietnam</Select.Option>
            <Select.Option value="US">United States</Select.Option>
          </Select>
        </Form.Item>

        <Space size="middle" style={{ width: "100%" }}>
          <Form.Item name="firstName" style={{ flex: 1 }}>
            <Input placeholder="First name" />
          </Form.Item>
          <Form.Item name="lastName" style={{ flex: 1 }}>
            <Input placeholder="Last name" />
          </Form.Item>
        </Space>

        <Form.Item name="address">
          <Input placeholder="Address" />
        </Form.Item>

        <Form.Item name="apartment">
          <Input placeholder="Apartment, suite, etc. (optional)" />
        </Form.Item>

        <Space size="middle" style={{ width: "100%" }}>
          <Form.Item name="city" style={{ flex: 1 }}>
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item name="postalCode" style={{ flex: 1 }}>
            <Input placeholder="Postal code (optional)" />
          </Form.Item>
        </Space>

        <Form.Item name="phone">
          <Input placeholder="Phone" />
        </Form.Item>

        <div className={styles.deliverySection}>
          <h3>Shipping method</h3>
          <Radio.Group
            defaultValue="Standard International"
            style={{ width: "100%" }}
          >
            <Radio
              value="Standard International"
              className={styles.deliveryOption}
            >
              <div className={styles.optionRow}>
                <span>Standard International</span>
                <span className={styles.price}>$5.00</span>
              </div>
            </Radio>

            <Radio
              value="International Express"
              className={styles.deliveryOption}
            >
              <div className={styles.optionRow}>
                <span>International Express</span>
                <span className={styles.price}>$15.00</span>
              </div>
            </Radio>
          </Radio.Group>
        </div>
      </Form>
    </div>
  );
}
