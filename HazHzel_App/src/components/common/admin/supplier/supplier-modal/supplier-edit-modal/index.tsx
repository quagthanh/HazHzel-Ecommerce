"use client";

import { updateProductsForAdmin } from "@/services/product.api";
import {
  Col,
  Form,
  message,
  Modal,
  notification,
  Row,
  UploadFile,
  UploadProps,
  Image,
} from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { FileType } from "@/types/product";
import { getBase64 } from "@/utils/helper";
import styles from "./style.module.scss";
import SupplierEditForm from "../supplier-edit-form";
import { updateSupplier } from "@/services/supplier.api";
import { useRouter } from "next/navigation";

const SupplierEditModal = (props: any) => {
  const { isOk, isCancel, dataUpdate, category, supplier } = props;
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate.name,
        contactName: dataUpdate.contactName,
        email: dataUpdate.email,
        phone: dataUpdate.phone,
        address: dataUpdate.address,
      });

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

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    isCancel();
  };

  const onFinish = async (values: any) => {
    if (dataUpdate) {
      const formData = new FormData();
      if (values.name) formData.append("name", values.name);
      if (values.contactName)
        formData.append("contactName", values.contactName);
      if (values.email) formData.append("email", values.email);
      if (values.phone) formData.append("phone", values.phone);
      if (values.address) formData.append("address", values.address);

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj);
        } else if (file.url) {
          formData.append("images", file.url);
        }
      });
      try {
        const res = await updateSupplier({
          _id: dataUpdate._id,
          formData,
        });

        if (res?.data) {
          message.success("Update supplier successfully");
          router.refresh();
          handleCancel();
        } else {
          notification.error({
            message: "Update failed",
            description: res?.message || "Something went wrong",
          });
        }
      } catch (error) {
        message.error("System Error");
      }
    }
  };

  const beforeUpload = () => false;

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return (
    <>
      <Modal
        maskClosable={true}
        title="Edit Supplier"
        open={isOk}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        closable={false}
        width={1200}
      >
        <div className={styles.subtitle}>
          Please update the form below to edit supplier information.
        </div>

        <Row gutter={24}>
          <Col span={16}>
            <SupplierEditForm
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

export default SupplierEditModal;
