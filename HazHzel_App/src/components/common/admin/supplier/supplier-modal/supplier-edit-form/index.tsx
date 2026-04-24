"use client";
import { PlusOutlined } from "@ant-design/icons";
import {
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Switch,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { FileType } from "@/types/product";
import styles from "./style.module.scss";

interface SupplierEditFormProps {
  form: FormInstance;
  onFinish: (values: any) => void;
  fileList: UploadFile[];
  handlePreview: (file: UploadFile) => void;
  handleChange: UploadProps["onChange"];
  beforeUpload: (file: FileType) => boolean;
}

export const SupplierEditForm = ({
  form,
  onFinish,
  fileList,
  handlePreview,
  handleChange,
  beforeUpload,
}: SupplierEditFormProps) => {
  const uploadButton = (
    <button className={styles.uploadButton} type="button">
      <PlusOutlined />
      <div className={styles.uploadText}>Upload</div>
    </button>
  );

  return (
    <Form
      name="supplier-edit"
      onFinish={onFinish}
      layout="vertical"
      form={form}
    >
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>General Information</h3>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Supplier Name"
              name="name"
              rules={[
                { required: true, message: "Please input supplier name" },
              ]}
            >
              <Input placeholder="Enter company name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Contact Person"
              name="contactName"
              rules={[
                { required: true, message: "Please input contact person" },
              ]}
            >
              <Input placeholder="Enter contact name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ type: "email", message: "Invalid email format" }]}
            >
              <Input placeholder="example@domain.com" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone Number" name="phone">
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Location & Settings</h3>

        <Form.Item label="Address" name="address">
          <Input.TextArea rows={3} placeholder="Enter full address" />
        </Form.Item>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Logo">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                accept="image/*"
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default SupplierEditForm;
