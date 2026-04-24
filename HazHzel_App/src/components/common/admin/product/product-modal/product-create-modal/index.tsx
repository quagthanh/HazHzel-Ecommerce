"use client";

import { createProductsForAdmin } from "@/services/product.api";
import { FileType } from "@/types/product";
import { buildTree, getBase64 } from "@/utils/helper";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  message,
  Modal,
  notification,
  Spin,
  Upload,
  UploadFile,
  UploadProps,
  Image,
  Select,
  Col,
  InputNumber,
  Row,
  Radio,
  Checkbox,
  TreeSelect,
} from "antd";
import { useMemo, useState } from "react";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";

const ProductCreateModal = (props: any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter();

  const { isOk, isCancel, category, supplier } = props;
  const treeData = useMemo(() => buildTree(category), [category]);

  const onFinish = async (values: any) => {
    if (fileList.length === 0) {
      message.error("Please choose atleast 1 picture");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("categoryId", values.category);
    formData.append("supplierId", values.supplier);

    if (values.gender !== undefined) {
      formData.append("gender", values.gender);
    }
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
    });

    const res = await createProductsForAdmin(formData);
    if (res?.data) {
      message.success("Create product successfully");
      router.refresh();
      handleCancel();
    } else {
      notification.error({
        message: "Can not create product inlight of failur",
        description: res?.message,
      });
    }
    setLoading(false);
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
        maskClosable={true}
        title="Add New Products"
        open={isOk}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        width={1100}
      >
        <Spin spinning={loading}>
          <div className={styles.subtitle}>
            Please fill the below form to create a new product.
          </div>

          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            initialValues={{
              ["stock"]: 0,
              ["gender"]: "UNISEX",
            }}
          >
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Products Description</h3>

              <Form.Item
                label="Product Name"
                name="name"
                rules={[
                  { required: true, message: "Please input product name" },
                ]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true }]}
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
                    rules={[{ required: true }]}
                  >
                    <Select
                      allowClear
                      placeholder="Select"
                      fieldNames={{ label: "name", value: "_id" }}
                      options={supplier}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {/* Advance Description Section */}
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
            </div>

            {/* Images Upload */}
            <Form.Item label="Images">
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

export default ProductCreateModal;
