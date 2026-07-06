"use client";

import {
  Col,
  Form,
  message,
  Modal,
  notification,
  Row,
  Select,
  Spin,
} from "antd";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useLoadingStore from "@/library/stores/useLoadingStore";
import {
  updateOrderStatusForAdmin,
  updatePaymentStatusForAdmin,
} from "@/services/order.api";
import { statusOrderEnum, statusPaymentEnum } from "@/types/enum";

const OrderEditModal = (props: any) => {
  const { isOk, isCancel, dataUpdate, setDataUpdate } = props;
  const [form] = Form.useForm();
  const router = useRouter();
  const { loading, setLoading } = useLoadingStore();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        status: dataUpdate.status,
        paymentStatus: dataUpdate.payment?.status,
      });
    }
  }, [dataUpdate, form]);

  const handleClose = () => {
    if (setDataUpdate) setDataUpdate(null);
    form.resetFields();
    isCancel();
  };

  const onFinish = async (values: any) => {
    if (!dataUpdate) return;
    try {
      setLoading(true);

      // Kiểm tra xem status nào bị thay đổi để gọi API tương ứng
      const promises = [];

      if (values.status !== dataUpdate.status) {
        promises.push(
          updateOrderStatusForAdmin({
            _id: dataUpdate._id,
            status: values.status,
          }),
        );
      }

      if (values.paymentStatus !== dataUpdate.payment?.status) {
        promises.push(
          updatePaymentStatusForAdmin({
            _id: dataUpdate._id,
            paymentStatus: values.paymentStatus,
          }),
        );
      }

      if (promises.length === 0) {
        handleClose();
        return;
      }

      const results = await Promise.all(promises);
      const hasError = results.some((res) => !res?.data);

      if (!hasError) {
        message.success("Update order status successfully");
        router.refresh();
        handleClose();
      } else {
        notification.error({
          message: "Update failed",
          description: "Something went wrong while updating statuses",
        });
      }
    } catch (error) {
      console.error(error);
      message.error("Error while updating order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      maskClosable={false}
      title={`Update Order ${dataUpdate?._id ? dataUpdate._id.substring(dataUpdate._id.length - 6).toUpperCase() : ""}`}
      open={isOk}
      onOk={() => form.submit()}
      onCancel={handleClose}
      confirmLoading={loading}
      cancelButtonProps={{ disabled: loading }}
      width={600}
    >
      <Spin spinning={loading}>
        <div style={{ marginBottom: 20, color: "#666" }}>
          Update the processing and payment status for this order.
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Order Status" name="status">
                <Select>
                  {Object.values(statusOrderEnum).map((status) => (
                    <Select.Option key={status} value={status}>
                      {status}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Payment Status" name="paymentStatus">
                <Select>
                  {Object.values(statusPaymentEnum).map((status) => (
                    <Select.Option key={status} value={status}>
                      {status}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default OrderEditModal;
