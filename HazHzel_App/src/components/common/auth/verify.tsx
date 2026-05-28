"use client";
import React from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
import { IBackendRes } from "@/types/backend";
import { checkCodeDTO } from "@/types/auth";
import { handleCheckCode } from "@/services/auth.api";

export default function Verify({ id }: any) {
  const router = useRouter();

  const onFinish = async (values: checkCodeDTO) => {
    values = { _id: values._id, code: values.code };
    const res = await handleCheckCode(values);

    if (res?.data) {
      message.info("Active account successfully");
      router.push(`/auth/login`);
    } else {
      notification.error({
        message: "Verify failed",
        description: res?.message,
      });
    }
  };

  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend>Active Account</legend>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item label="User's id" name="_id" initialValue={id} hidden>
              <Input disabled />
            </Form.Item>
            <div>Your active code have send to your gmail!</div>
            <Divider></Divider>
            <Form.Item
              label="Activate Code"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input your code!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Link href={"/"}>
            <ArrowLeftOutlined /> Back to hom page
          </Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Already have account? <Link href={"/auth/login"}>Login</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
}
