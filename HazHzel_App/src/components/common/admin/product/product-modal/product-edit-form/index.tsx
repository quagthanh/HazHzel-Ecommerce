"use client";
import { PlusOutlined } from "@ant-design/icons";
import {
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Checkbox,
  Upload,
  UploadFile,
  UploadProps,
  TreeSelect,
} from "antd";
import { FileType } from "@/types/product";
import styles from "./style.module.scss";
import { useMemo } from "react";
import { buildTree } from "@/utils/helper";

interface ProductEditFormProps {
  form: FormInstance;
  onFinish: (values: any) => void;
  categoryOptions: any[];
  supplierOptions: any[];
  fileList: UploadFile[];
  handlePreview: (file: UploadFile) => void;
  handleChange: UploadProps["onChange"];
  beforeUpload: (file: FileType) => boolean;
}

export const ProductEditForm = ({
  form,
  onFinish,
  categoryOptions,
  supplierOptions,
  fileList,
  handlePreview,
  handleChange,
  beforeUpload,
}: ProductEditFormProps) => {
  const treeData = useMemo(() => buildTree(categoryOptions), [categoryOptions]);

  const uploadButton = (
    <button className={styles.uploadButton} type="button">
      <PlusOutlined />
      <div className={styles.uploadText}>Upload</div>
    </button>
  );

  return (
    <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
      {/* --- SECTION 1: Products Description --- */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Products Description</h3>

        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please input product name" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input description" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter your description" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: false }]}
            >
              <TreeSelect
                treeData={treeData}
                fieldNames={{
                  label: "name",
                  value: "_id",
                  children: "children",
                }}
                placeholder="Select Parent"
                allowClear
                treeDefaultExpandAll
                treeLine
                showSearch
                treeNodeFilterProp="name"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Brand Type"
              name="supplier"
              rules={[{ required: true, message: "Please select supplier" }]}
            >
              <Select
                allowClear
                placeholder="Select"
                fieldNames={{ label: "name", value: "_id" }}
                options={supplierOptions}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Advance Description</h3>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="Select Gender" name="gender">
              <Radio.Group>
                <Radio value="WOMEN">Women</Radio>
                <Radio value="MEN">Men</Radio>
                <Radio value="UNISEX">Unisex</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Size" name="size">
              <Select placeholder="Select" options={[]} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Colors" name="colors">
              <Select placeholder="Select" options={[]} />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* --- SECTION 5: Product Images --- */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Product Images</h3>
        <Form.Item>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={beforeUpload}
            multiple={true}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
      </div>
    </Form>
  );
};

export default ProductEditForm;
