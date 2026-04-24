"use client";
import { handleEditUser } from "@/services/user.api";
import { Modal, message, notification, Spin, Row, Col, Form } from "antd";
import { useEffect, useState } from "react";
import { UserEditForm } from "../../form/form-user-edit";

const UserEditModal = (props: any) => {
  const { isOk, isCancel, dataUpdate, setDataUpdate } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        _id: dataUpdate._id,
        name: dataUpdate.name,
        email: dataUpdate.email,
        phone: dataUpdate.phone,
        address: dataUpdate.address,
        roles: dataUpdate.roles,
        accountType: dataUpdate.accountType,
        isActive: dataUpdate.isActive,
        createdAt: dataUpdate.createdAt,
      });
    }
  }, [dataUpdate, form]);

  const onFinish = async (values: any) => {
    if (dataUpdate) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone || "");
      formData.append("address", values.address || "");
      formData.append("roles", JSON.stringify(values.roles || []));
      formData.append("isActive", String(values.isActive));

      const res = await handleEditUser({
        _id: dataUpdate._id,
        formData,
      });

      if (res?.data) {
        message.success("Update user successfully");
        handleCancel();
      } else {
        notification.error({
          message: "Update failed",
          description: res?.message,
        });
      }
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (setDataUpdate) {
      setDataUpdate(null);
    }
    form.resetFields();
    isCancel();
  };

  return (
    <>
      <Modal
        maskClosable={true}
        title="Edit User Profile"
        open={isOk}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        width={1000}
      >
        <Spin spinning={loading}>
          <div style={{ padding: "10px 0" }}>
            <Row gutter={24}>
              <Col span={24}>
                <UserEditForm form={form} onFinish={onFinish} />
              </Col>
            </Row>
          </div>
        </Spin>
      </Modal>
    </>
  );
};

export default UserEditModal;
