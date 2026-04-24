"use client";
import { PlusOutlined } from "@ant-design/icons";
import {
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { FileType } from "@/types/product";
import styles from "./style.module.scss";

interface CategoryEditFormProps {
  form: FormInstance;
  onFinish: (values: any) => void;
  fileList: UploadFile[];
  handlePreview: (file: UploadFile) => void;
  handleChange: UploadProps["onChange"];
  beforeUpload: (file: FileType) => boolean;
  categoryOptions: any[];
}

export const CategoryEditForm = ({
  form,
  onFinish,
  fileList,
  handlePreview,
  handleChange,
  beforeUpload,
  categoryOptions,
}: CategoryEditFormProps) => {
  const uploadButton = (
    <button className={styles.uploadButton} type="button">
      <PlusOutlined />
      <div className={styles.uploadText}>Upload</div>
    </button>
  );

  return (
    <Form
      name="category-edit"
      onFinish={onFinish}
      layout="vertical"
      form={form}
    >
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>General Information</h3>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="Category Name"
              name="name"
              rules={[
                { required: true, message: "Please input category name" },
              ]}
            >
              <Input placeholder="Enter category name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Parent Category"
              name="parentCategory"
              rules={[{ required: true }]}
            >
              <Select
                allowClear
                placeholder="Select"
                fieldNames={{ label: "name", value: "_id" }}
                options={categoryOptions}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Slug"
              name="slug"
              rules={[{ required: true, message: "Please input slug" }]}
            >
              <Input disabled={true} placeholder="Enter slug" />
            </Form.Item>
          </Col>

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

export default CategoryEditForm;
