"use client";

import { Button, Form, Input, Select } from "antd";
import styles from "./style.module.scss";

interface ProfileFormProps {
  user: {
    name?: string;
    email?: string;
    roles?: string[];
  } | null;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
  const [form] = Form.useForm();

  const nameParts = user?.name?.split(" ") ?? [];
  const firstName = nameParts[nameParts.length - 1] ?? "";
  const lastName = nameParts.slice(0, -1).join(" ") ?? "";

  const onFinish = (values: unknown) => {};

  return (
    <div className={styles.profileSection}>
      <h1 className={styles.sectionTitle}>THÔNG TIN CÁ NHÂN</h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className={styles.profileForm}
        initialValues={{
          firstName,
          lastName,
          gender: "Nam",
          email: user?.email ?? "",
        }}
      >
        <Form.Item
          name="firstName"
          label={<span className={styles.formLabel}>TÊN</span>}
        >
          <Input className={styles.formInput} placeholder="Nhập tên" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label={<span className={styles.formLabel}>HỌ</span>}
        >
          <Input className={styles.formInput} placeholder="Nhập họ" />
        </Form.Item>

        <Form.Item
          name="birthday"
          label={<span className={styles.formLabel}>SINH NHẬT</span>}
        >
          <Input
            className={styles.formInput}
            placeholder="Nhập ngày tháng năm"
          />
        </Form.Item>

        <Form.Item
          name="gender"
          label={<span className={styles.formLabel}>GIỚI TÍNH</span>}
        >
          <Select
            className={styles.formSelect}
            options={[
              { value: "Nam", label: "Nam" },
              { value: "Nữ", label: "Nữ" },
              { value: "Khác", label: "Khác" },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label={<span className={styles.formLabel}>SỐ ĐIỆN THOẠI</span>}
        >
          <Input
            className={styles.formInput}
            placeholder="Nhập số điện thoại"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className={styles.formLabel}>EMAIL</span>}
        >
          <Input
            className={styles.formInput}
            placeholder="Nhập email"
            type="email"
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" block className={styles.submitBtn}>
            CẬP NHẬT THÔNG TIN
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileForm;
