"use client";
import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Space,
  Row,
  Col,
  Upload,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { createVariant, updateVariant } from "@/services/variant.api";
import { getBase64 } from "@/utils/helper";
import { IProductVariant } from "@/types/interface";

interface VariantModalProps {
  open: boolean;
  onCancel: () => void;
  onReload: () => void;
  productId: string;
  dataUpdate: IProductVariant | null;
}

const VariantModal = ({
  open,
  onCancel,
  onReload,
  productId,
  dataUpdate,
}: VariantModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      if (dataUpdate) {
        form.setFieldsValue({
          originalPrice: dataUpdate.originalPrice,
          currentPrice: dataUpdate.currentPrice,
          stock: dataUpdate.stock || dataUpdate.stock,
          sku: dataUpdate.sku,
          attributes: dataUpdate.attributes,
        });

        if (dataUpdate.images && dataUpdate.images.length > 0) {
          setFileList(
            dataUpdate.images.map((img: any) => ({
              uid: img.public_id,
              name: "image",
              status: "done",
              url: img.secure_url,
            })),
          );
        } else {
          setFileList([]);
        }
      } else {
        form.resetFields();
        form.setFieldValue("attributes", [
          { k: "Color", v: "" },
          { k: "Size", v: "" },
        ]);
        setFileList([]);
      }
    }
  }, [open, dataUpdate, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    const formData = new FormData();

    if (!dataUpdate) {
      formData.append("productId", productId);
    }

    if (values.originalPrice)
      formData.append("originalPrice", values.originalPrice);
    if (values.currentPrice)
      formData.append("currentPrice", values.currentPrice);
    if (values.stock) formData.append("stock", values.stock);
    if (values.sku) formData.append("sku", values.sku);

    formData.append("attributes", JSON.stringify(values.attributes));

    const oldImages = fileList
      .filter((file) => file.url)
      .map((file) => ({
        public_id: file.uid,
        secure_url: file.url,
      }));

    formData.append("existingImages", JSON.stringify(oldImages));

    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
    });

    try {
      let res;
      if (dataUpdate) {
        res = await updateVariant({ _id: dataUpdate._id, formData });
      } else {
        res = await createVariant(formData);
      }

      if (res.statusCode === 201 || res.statusCode === 200) {
        message.success(
          dataUpdate ? "Update variant success" : "Create variant success",
        );
        onReload();
        onCancel();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("System error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title={dataUpdate ? "Update Variant" : "Add Variant"}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
      width={700}
      destroyOnClose
      maskClosable={false}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Attributes (e.g. Color: Red | Size: M)
        </label>
        <Form.List name="attributes">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "k"]}
                    rules={[{ required: true, message: "Missing Key" }]}
                  >
                    <Input placeholder="Key (e.g Color)" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "v"]}
                    rules={[{ required: true, message: "Missing Value" }]}
                  >
                    <Input placeholder="Value (e.g Red)" />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    style={{ color: "red" }}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Attribute
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="originalPrice"
              label="Original Price"
              rules={[{ required: true }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="currentPrice"
              label="Current Price"
              rules={[{ required: true }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="sku" label="SKU (Leave empty to auto-generate)">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item label="Images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={() => false}
            maxCount={5}
            accept="image/*"
          >
            {fileList.length < 5 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VariantModal;
