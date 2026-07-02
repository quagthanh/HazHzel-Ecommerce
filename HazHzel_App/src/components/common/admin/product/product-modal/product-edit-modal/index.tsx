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
  Tabs,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { FileType } from "@/types/product";
import { getBase64 } from "@/utils/helper";
import styles from "./style.module.scss";
import ProductCardPreview from "./product-card-preview";
import ProductEditForm from "../product-edit-form";
import VariantList from "../../variant-section/variant-list";
import { useRouter } from "next/navigation";
import useLoadingStore from "@/library/stores/useLoadingStore";

const ProductEditModal = (props: any) => {
  const { isOk, isCancel, dataUpdate, setDataUpdate, category, supplier } =
    props;
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { loading, setLoading } = useLoadingStore();

  const router = useRouter();
  useEffect(() => {
    const supplierId = dataUpdate?.supplierId?._id;
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate.name,
        description: dataUpdate.description,
        category: dataUpdate.categoryId?._id,
        supplier: supplier.some((x: any) => x._id == supplierId)
          ? supplierId
          : undefined,
        gender: dataUpdate.gender,
        stock: dataUpdate.stockQuantity,
        status: dataUpdate.status,
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

  const onFinish = async (values: any) => {
    if (!dataUpdate) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("categoryId", values.category);
      formData.append("supplierId", values.supplier);

      if (values.gender) formData.append("gender", values.gender);
      if (values.status) formData.append("status", values.status);
      const oldImages = fileList
        .filter((file) => file.url)
        .map((file) => ({
          public_id: file.uid,
          secure_url: file.url,
        }));
      formData.append("existingImages", JSON.stringify(oldImages));
      // Add new images
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj);
        }
      });

      const res = await updateProductsForAdmin({
        _id: dataUpdate._id,
        formData,
      });

      if (res?.data) {
        message.success("Update product successfully");
        router.refresh();
        handleCloseUpdateModal();
      } else {
        notification.error({
          message: "Update product failed",
          description: res?.message,
        });
      }
    } catch (error) {
      console.error(error);
      message.error("Error while updating product");
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
    <button className={styles.uploadButton} type="button">
      <PlusOutlined />
      <div className={styles.uploadText}>Upload</div>
    </button>
  );
  const currentPreviewImage =
    fileList.length > 0 ? fileList[0].url || fileList[0].preview : null;
  const tabItems = [
    {
      key: "info",
      label: "Product Info",
      children: (
        <div style={{ paddingTop: 10 }}>
          <div className={styles.subtitle}>
            Please update the form below to edit product information.
          </div>
          <Row gutter={24}>
            <Col span={16}>
              <ProductEditForm
                form={form}
                onFinish={onFinish}
                categoryOptions={category}
                supplierOptions={supplier}
                fileList={fileList}
                handlePreview={handlePreview}
                handleChange={handleChange}
                beforeUpload={beforeUpload}
              />
            </Col>

            <Col span={8}>
              <ProductCardPreview
                form={form}
                dataUpdate={dataUpdate}
                fileList={fileList}
              />
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "variants",
      label: "Variants Management",
      children: (
        <div style={{ paddingTop: 10 }}>
          {dataUpdate?._id ? (
            <VariantList productId={dataUpdate._id} />
          ) : (
            <div style={{ textAlign: "center", color: "#999", padding: 20 }}>
              Cannot manage variants because Product ID is missing.
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        maskClosable={false}
        title="Edit Product"
        open={isOk}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        closable={false}
        width={1200}
        confirmLoading={loading}
        cancelButtonProps={{ disabled: loading }}
      >
        <Spin spinning={loading}>
          <Tabs defaultActiveKey="info" items={tabItems} />
        </Spin>{" "}
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

export default ProductEditModal;
