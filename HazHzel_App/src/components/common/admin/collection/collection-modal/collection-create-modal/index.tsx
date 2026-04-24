"use client";

import { createCollection } from "@/services/collection.api";
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
import { useState } from "react";

interface CollectionCreateModalProps {
  isOk: boolean;
  isCancel: () => void;
}

const CollectionCreateModal = ({
  isOk,
  isCancel,
}: CollectionCreateModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = async (values: any) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
    });

    try {
      const res = await createCollection(formData);
      if (res?.data) {
        message.success("Create collection successfully");
        handleCancel();
        window.location.reload();
      } else {
        notification.error({
          message: "Create failed",
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
        title="Add New Collection"
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
                label="Collection Name"
                name="name"
                rules={[{ required: true, message: "Please input name" }]}
              >
                <Input placeholder="Collection Name" />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={4} placeholder="Enter your description" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Row gutter={16}>
                <Col span={12}>
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

export default CollectionCreateModal;
