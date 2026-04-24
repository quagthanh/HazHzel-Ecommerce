"use client";
import { Input, Modal, Steps, Form, Button, notification, Result } from "antd";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  handleCheckCode,
  handleRetryActive,
  retryActiveDTO,
} from "@/services/auth.api";
import styles from "@/components/common/auth/reactive-model/style.module.scss";
import { useHasMounted } from "@/utils/hooks/useHasMounted";
export default function ModalReactive(props: any) {
  const { isModalOpen, onClose, userEmail } = props;
  const [current, setCurrent] = useState(0);
  const [userId, setUserId] = useState<string | null>("");
  const [form] = Form.useForm();
  useEffect(() => {
    if (userEmail) {
      form.setFieldValue("email", userEmail);
    }
  }, [userEmail]);

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return <></>;
  }
  const handleOk = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const onFinishStep0 = async (value: any) => {
    const { email } = value;
    const res = await handleRetryActive({ email });
    if (res?.data) {
      setUserId(res?.data?.data?._id);
      setCurrent(1);
    } else {
      notification.error({
        message: res?.result?.data?.message,
        description: "Something go wrong when re-active the code",
      });
    }
  };

  const onFinishStep1 = async (value: any) => {
    const { code } = value;
    if (!userId) {
      return null;
    }
    const checkCode = {
      _id: userId,
      code,
    };
    const res = await handleCheckCode(checkCode);
    if (res?.data) {
      setCurrent(2);
    } else {
      notification.error({
        message: res.message,
        description: "Lỗi khi gửi code xác nhận lại",
      });
    }
    return res;
  };
  return (
    <Modal
      title="Kích hoạt lại tài khoản"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={true}
    >
      <Steps
        current={current}
        items={[
          {
            title: "Login",
            icon: <UserOutlined />,
          },
          {
            title: "Verification",
            icon: <SolutionOutlined />,
          },

          {
            title: "Done",
            icon: <SmileOutlined />,
          },
        ]}
      />
      {current == 0 && (
        <>
          <div style={{ margin: "20px 0" }}>
            <p>Your account has not active yet</p>
          </div>
          <Form
            name="Verify"
            onFinish={onFinishStep0}
            autoComplete="off"
            layout="vertical"
            form={form}
          >
            <Form.Item name="email">
              <Input disabled value={userEmail} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.submitButton}
              >
                Resend code
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
      {current === 1 && (
        <>
          <div style={{ margin: "20px 0" }}>
            <p>Please enter the code again</p>
          </div>
          <Form
            name="Verif2"
            onFinish={onFinishStep1}
            autoComplete="off"
            layout="vertical"
            form={form}
          >
            <Form.Item label="Code" name="code" rules={[{ required: true }]}>
              <Input></Input>
            </Form.Item>

            <Form.Item>
              <Button
                key="back-button"
                type="primary"
                htmlType="submit"
                className={styles.submitButton}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
      {current === 2 && (
        <>
          <div style={{ margin: "20px 0" }}>
            <Result
              status="success"
              title="Your account has already actived"
              subTitle="Now you can go back to login page"
              extra={[
                <Button
                  key={`${current}`}
                  type="primary"
                  onClick={handleOk}
                  className={styles.submitButton}
                >
                  Back
                </Button>,
              ]}
            />
          </div>
        </>
      )}
    </Modal>
  );
}
