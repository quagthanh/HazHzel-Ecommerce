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
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import Logo from "@/components/common/auth/login-logo";
import styles from "@/components/common/auth/register-form/style.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerDTO } from "@/types/auth";
import { handleSignIn } from "@/services/auth.api";

const { Title, Text } = Typography;

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: registerDTO) => {
    console.log("Form values:", values);
    setLoading(true);
    values = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    const res = await handleSignIn(values);
    if (res?.data) {
      router.push(`/auth/verify/${res?.data?._id}`);
      setLoading(false);
    } else {
      setLoading(false);
      notification.error({
        message: "Register failed",
        description: res?.message,
      });
    }
  };

  return (
    <div className={styles.registerFormContainer}>
      <div className={styles.registerFormWrapper}>
        <Link href={"/"}>
          <Logo />
        </Link>

        <Title level={2} className={styles.registerFormTitle}>
          Create an account
        </Title>

        <div className={styles.registerForm}>
          <Form
            name="registerForm"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            className={styles.formItem}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name!",
                },
              ]}
              className={styles.formItem}
            >
              <Input
                className={styles.formInput}
                placeholder="Enter your name"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
              className={styles.formItem}
            >
              <Input
                className={styles.formInput}
                placeholder="Enter your email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters!",
                },
              ]}
              className={styles.formItem}
            >
              <Input.Password
                className={styles.formInput}
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!"),
                    );
                  },
                }),
              ]}
              className={styles.formItem}
            >
              <Input.Password
                className={styles.formInput}
                placeholder="Confirm your password"
              />
            </Form.Item>

            <Form.Item
              name="agreed"
              valuePropName="checked"
              className={styles.checkboxItem}
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("You must accept the terms and conditions"),
                        ),
                },
              ]}
            >
              <Checkbox className={styles.checkbox}>
                <Text className={styles.checkboxText}>
                  I agree to all the <Link href="#">Terms & Conditions</Link>
                </Text>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                block
                loading={loading}
                className={styles.submitButton}
              >
                Sign up
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
                Already have an account?<span> </span>
                <Link href={"/auth/login"} className={styles.loginLinkAction}>
                  Log in
                </Link>
              </Text>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
