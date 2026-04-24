"use client";

import { updateProductsForAdmin } from "@/services/product.api";
import {
  Col,
  Form,
  Input,
  message,
  Modal,
  notification,
  Row,
  Select,
  Radio,
  InputNumber,
  Upload,
  UploadFile,
  UploadProps,
  Image,
} from "antd";
import { useEffect, useState } from "react";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { FileType } from "@/types/product";
import { getBase64 } from "@/utils/helper";
import styles from "./style.module.scss";
import { CollectionEditForm } from "../collection-edit-form";
import { updateCollection } from "@/services/collection.api";

const CollectionEditModal = (props: any) => {
  const { isOk, isCancel, dataUpdate, setDataUpdate, category, collection } =
    props;
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    if (dataUpdate) {
      // Set form values
      form.setFieldsValue({
        name: dataUpdate.name,
        slug: dataUpdate.slug,
        description: dataUpdate.description,
        status: dataUpdate.status ?? true,
      });

      // Set existing images
      if (dataUpdate.images && dataUpdate.images.length > 0) {
        const existingFiles = dataUpdate.images.map(
          (img: any, index: number) => ({
            uid: `-${index}`,
            name: `image-${index}`,
            status: "done",
            url: img.secure_url || img,
          }),
        );
        setFileList(existingFiles);
      }
    }
  }, [dataUpdate, form]);

  const handleCloseUpdateModal = () => {
    if (setDataUpdate) {
      setDataUpdate(null);
    }
    form.resetFields();
    setFileList([]);
    isCancel();
  };

  const onFinish = async (values: any) => {
    if (dataUpdate) {
      const formData = new FormData();
      if (values.name) formData.append("name", values.name);
      if (values.slug) formData.append("slug", values.slug);
      if (values.description)
        formData.append("description", values.description);

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj);
        }
      });

      const res = await updateCollection({
        _id: dataUpdate._id,
        formData,
      });

      if (res?.data) {
        handleCloseUpdateModal();
        message.success("Update collection successfully");
      } else {
        notification.error({
          message: "Update failed",
          description: res?.data?.message,
        });
      }
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
    <button className={styles.uploadButton} type="button">
      <PlusOutlined />
      <div className={styles.uploadText}>Upload</div>
    </button>
  );
  const currentPreviewImage =
    fileList.length > 0 ? fileList[0].url || fileList[0].preview : null;

  return (
    <>
      <Modal
        maskClosable={true}
        title="Edit Collection"
        open={isOk}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        closable={false}
        width={1200}
      >
        <div className={styles.subtitle}>
          Please update the form below to edit collection information.
        </div>

        <Row gutter={24}>
          <Col span={16}>
            <CollectionEditForm
              form={form}
              onFinish={onFinish}
              fileList={fileList}
              handlePreview={handlePreview}
              handleChange={handleChange}
              beforeUpload={beforeUpload}
            />
          </Col>
        </Row>
      </Modal>

      {/* Lightbox Preview */}
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

export default CollectionEditModal;
