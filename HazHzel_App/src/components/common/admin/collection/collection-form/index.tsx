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

interface SupplierFormProps {
  form: FormInstance;
  onFinish: (values: any) => void;
  fileList: UploadFile[];
  handlePreview: (file: UploadFile) => void;
  handleChange: UploadProps["onChange"];
  beforeUpload: (file: FileType) => boolean;
}

const SupplierForm = ({
  form,
  onFinish,
  fileList,
  handlePreview,
  handleChange,
  beforeUpload,
}: SupplierFormProps) => {
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload Logo</div>
    </button>
  );

  return (
    <Form
      name="supplier-form"
      onFinish={onFinish}
      layout="vertical"
      form={form}
    >
      <Row gutter={24}>
        {/* --- Cột Trái: Thông tin --- */}
        <Col span={12}>
          <Form.Item
            label="Supplier Name"
            name="name"
            rules={[{ required: true, message: "Please input name" }]}
          >
            <Input placeholder="Company Name" />
          </Form.Item>

          <Form.Item label="Contact Person" name="contactName">
            <Input placeholder="Contact Name" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ type: "email", message: "Invalid email" }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phone" name="phone">
                <Input placeholder="Phone" />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        {/* --- Cột Phải: Địa chỉ & Logo --- */}
        <Col span={12}>
          <Form.Item label="Address" name="address">
            <Input.TextArea rows={4} placeholder="Address" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* QUAN TRỌNG: Không đặt name cho Form.Item này để tránh conflict với state fileList */}
              <Form.Item label="Logo">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={beforeUpload}
                  maxCount={1}
                  accept="image/*"
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default SupplierForm;
