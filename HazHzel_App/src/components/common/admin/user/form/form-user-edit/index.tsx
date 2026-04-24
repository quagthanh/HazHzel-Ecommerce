"use client";

import { Form, FormInstance, Input, Select, Switch } from "antd";
import dayjs from "dayjs";
interface UserEditFormProps {
  form: FormInstance;
  onFinish: (values: any) => void;
}

export const UserEditForm = ({ form, onFinish }: UserEditFormProps) => {
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="User ID" name="_id">
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input disabled />
      </Form.Item>

      <Form.Item label="Phone" name="phone">
        <Input />
      </Form.Item>

      <Form.Item label="Address" name="address">
        <Input />
      </Form.Item>

      <Form.Item label="Roles" name="roles">
        <Select mode="multiple">
          <Select.Option value="USER">USER</Select.Option>
          <Select.Option value="ADMIN">ADMIN</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Account Type" name="accountType">
        <Input disabled />
      </Form.Item>

      <Form.Item label="Active" name="isActive" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item
        label="Created At"
        name="createdAt"
        getValueProps={(value) => ({
          value: value ? dayjs(value).format("YYYY-MM-DD HH:mm") : "",
        })}
      >
        <Input disabled />
      </Form.Item>
    </Form>
  );
};
