"use client";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Typography,
  Divider,
  Form,
  notification,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  GoogleOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import Logo from "@/components/common/auth/login-logo";
import styles from "@/components/common/auth/login-form/style.module.scss";
import { handleLogin } from "@/services/auth.api";
import { authenticate } from "@/utils/actions";
import ModalChangePassword from "@/components/common/auth/modal.change.password";
import { useRouter, useSearchParams } from "next/navigation";
import ModalReactive from "@/components/common/auth/reactive-model/modal.reactive";
const { Title, Text, Link } = Typography;

export interface FormData {
  username: string;
  password: string;
  remember: boolean;
}

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [showReactiveModal, setReactiveModal] = useState(false);
  const [showChangePassModal, setChangePassModal] = useState(false);
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const onFinish = async (values: FormData) => {
    try {
      setLoading(true);
      const { username } = values;
      const res = await authenticate(values, callbackUrl);
      setLoading(false);
      if (res?.error) {
        if (res?.code == 2) {
          setReactiveModal(true);
          setUserEmail(username);
          return;
        }
        notification.error({
          message: res?.error,
        });
      } else {
        router.push("/");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <div className={styles.loginFormWrapper}>
        <Link href={"/"}>
          <Logo />
        </Link>

        <Title level={2} className={styles.loginFormTitle}>
          Log in to your account
        </Title>

        <div className={styles.loginForm}>
          <Form
            name="loginForm"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            labelCol={{ span: 14 }}
            className={styles.formItem}
          >
            <Form.Item
              label="Email"
              name="username"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
              className={styles.formItem}
            >
              <Input className={styles.formInput} placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
              ]}
              className={styles.formItem}
            >
              <Input.Password
                className={styles.formInput}
                placeholder="Enter your password"
              />
            </Form.Item>
            <div className={styles.formOptions}>
              <Form.Item
                name="remember"
                valuePropName="checked"
                className={styles.checkboxItem}
              >
                <Checkbox className={styles.checkbox}>
                  <Text className={styles.checkboxText}>Remember me</Text>
                </Checkbox>
              </Form.Item>

              <Link
                href="/auth/forgot-password"
                className={styles.forgotPassword}
              >
                Forgot password?
              </Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                block
                loading={loading}
                className={styles.submitButton}
              >
                Log in
              </Button>
            </Form.Item>
            <Divider className={styles.formDivider}>
              <Text type="secondary" className={styles.dividerText}>
                Or continue with
              </Text>
            </Divider>
            <div className={styles.socialButtons}>
              <Button
                size="large"
                icon={<GoogleOutlined />}
                className={styles.socialButton}
              >
                Google
              </Button>
              <Button
                size="large"
                icon={<FacebookOutlined />}
                className={styles.socialButton}
              >
                Facebook
              </Button>
            </div>

            <div className={styles.loginLink}>
              <Text className={styles.loginLinkText}>
                Do not have an account?
                <Link
                  href={"/auth/register"}
                  className={styles.loginLinkAction}
                >
                  Sign up
                </Link>
              </Text>
            </div>
          </Form>
        </div>
      </div>
      <ModalReactive
        isModalOpen={showReactiveModal}
        onClose={() => setReactiveModal(false)}
        userEmail={userEmail}
      />
      {/* <ModalChangePassword
        isModalOpen={changePassword}
        setIsModalOpen={setChangePassword}
      /> */}
    </div>
  );
};

export default LoginForm;
