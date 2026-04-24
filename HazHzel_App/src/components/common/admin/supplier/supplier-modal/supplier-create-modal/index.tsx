"use client";

import { createSupplier } from "@/services/supplier.api";
import { FileType } from "@/types/product";
import { getBase64 } from "@/utils/helper";
import { PlusOutlined } from "@ant-design/icons";
import {
  Col,
  Form,
  Input,
  message,
  Modal,
  notification,
  Row,
  Switch,
  Upload,
  UploadFile,
  UploadProps,
  Image,
} from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SupplierCreateModalProps {
  isOk: boolean;
  isCancel: () => void;
}

const SupplierCreateModal = ({ isOk, isCancel }: SupplierCreateModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter();
  const onFinish = async (values: any) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", values.name);
    if (values.contactName) formData.append("contactName", values.contactName);
    if (values.email) formData.append("email", values.email);
    if (values.phone) formData.append("phone", values.phone);
    if (values.address) formData.append("address", values.address);

    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
    });

    try {
      const res = await createSupplier(formData);
      if (res?.data) {
        message.success("Create supplier successfully");
        router.refresh();
        handleCancel();
      } else {
        notification.error({
          message: "Create supplier failed",
          description: res?.message,
        });
      }
    } catch (error) {
      message.error("System error");
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file: FileType) => {
    setFileList((prev) => [...prev, file]);
    return false;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    isCancel();
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Modal
        maskClosable={false}
        title="Add New Supplier"
        open={isOk}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        width={800}
        confirmLoading={loading}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={24}>
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
                    rules={[{ type: "email" }]}
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

            <Col span={12}>
              <Form.Item label="Address" name="address">
                <Input.TextArea rows={4} placeholder="Address" />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  {/* QUAN TRỌNG: KHÔNG ĐỂ PROP NAME="LOGO" */}
                  <Form.Item label="Logo">
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      beforeUpload={beforeUpload}
                      maxCount={1}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default SupplierCreateModal;
