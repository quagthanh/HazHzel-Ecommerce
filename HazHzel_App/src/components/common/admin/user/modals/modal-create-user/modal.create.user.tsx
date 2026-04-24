"use client";
import { handleCreateUser } from "@/services/user.api";
import { PlusOutlined } from "@ant-design/icons";
import {
  Col,
  Form,
  Input,
  message,
  Modal,
  notification,
  Row,
  Spin,
  Image,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import styles from "@/components/common/admin/user/modals/modal-create-user/style.module.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getBase64 } from "@/utils/helper";
import { FileType } from "@/types/product";
const UserCreateModal = (props: any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { isOk, isCancel } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    isCancel();
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

  const onFinish = async (values: any) => {
    if (fileList.length === 0) {
      message.error("Please choose atleast 1 picture");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);

    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
    });
    const res = await handleCreateUser(formData);
    if (res?.data) {
      message.success("Create user successfully");
      router.refresh();
      handleCancel();
    } else {
      notification.error({
        message: "Error when create user",
        description: res?.message,
      });
    }
    setLoading(false);
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
        title="Add User"
        open={isOk}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        width={1100}
      >
        <Spin spinning={loading}>
          <div className={styles.subtitle}>
            Please fill the below form to create a new user.
          </div>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>User Credentials</h3>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter email" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true }]}
                  >
                    <Input.Password placeholder="******" />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Profile Information</h3>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>

              <Form.Item label="Avatar">
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
            </div>
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

export default UserCreateModal;
