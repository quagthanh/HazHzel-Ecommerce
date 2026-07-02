"use client";

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
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { FileType } from "@/types/product";
import { getBase64 } from "@/utils/helper";
import styles from "./style.module.scss";
import SupplierEditForm from "../supplier-edit-form";
import { updateSupplierForAdmin } from "@/services/supplier.api";
import { useRouter } from "next/navigation";
import useLoadingStore from "@/library/stores/useLoadingStore";

const SupplierEditModal = (props: any) => {
  const { isOk, isCancel, dataUpdate, setDataUpdate, category, supplier } =
    props;
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter();
  const { loading, setLoading } = useLoadingStore();
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

  const handleCloseUpdateModal = () => {
    if (setDataUpdate) {
      setDataUpdate(null);
    }
    form.resetFields();
    setFileList([]);
    isCancel();
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    isCancel();
  };

  const onFinish = async (values: any) => {
    if (!dataUpdate) return;
    try {
      setLoading(true);
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
      const res = await updateSupplierForAdmin({
        _id: dataUpdate._id,
        formData,
      });

      if (res?.data) {
        message.success("Update supplier successfully");
        router.refresh();
        handleCloseUpdateModal();
      } else {
        notification.error({
          message: "Update failed",
          description: res?.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error(error);
      message.error("Error while updating supplier");
    } finally {
      setLoading(false);
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
        confirmLoading={loading}
        cancelButtonProps={{ disabled: loading }}
      >
        <Spin spinning={loading}>
          <div className={styles.subtitle}>
            Please update the form below to edit supplier information.
          </div>

          <Row gutter={24}>
            <Col span={24}>
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
        </Spin>
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
