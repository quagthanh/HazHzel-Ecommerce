"use client";

import useLoadingStore from "@/library/stores/useLoadingStore";
import { createCategory } from "@/services/category.api";
import { FileType } from "@/types/product";
import { buildTree, getBase64 } from "@/utils/helper";
import { PlusOutlined } from "@ant-design/icons";
import {
  Col,
  Form,
  Input,
  message,
  Modal,
  notification,
  Row,
  Upload,
  UploadFile,
  UploadProps,
  Image,
  Select,
  TreeSelect,
  Spin,
} from "antd";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface CategoryCreateModalProps {
  isOk: boolean;
  isCancel: () => void;
  categoryOptions: any[];
}

const CategoryCreateModal = ({
  isOk,
  isCancel,
  categoryOptions,
}: CategoryCreateModalProps) => {
  const [form] = Form.useForm();
  const { loading, setLoading } = useLoadingStore();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter();
  const treeData = useMemo(() => buildTree(categoryOptions), [categoryOptions]);
  const onFinish = async (values: any) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", values.name);
    if (values.parentCategory)
      formData.append("parentCategory", values.parentCategory);

    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
    });

    try {
      const res = await createCategory(formData);
      if (res?.data) {
        message.success("Create category successfully");
        router.refresh();
        handleCancel();
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
        title="Add New Category"
        open={isOk}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        width={800}
        confirmLoading={loading}
      >
        <Spin spinning={loading}>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  label="Category Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input category name" },
                  ]}
                >
                  <Input placeholder="Category Name" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Parent Category"
                  name="parentCategory"
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

              <Col span={8}>
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
        </Spin>
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

export default CategoryCreateModal;
