"use client";

import { useEffect, useState } from "react";
import { Form, Input, Checkbox, Button, message } from "antd";
import type { UserProfile } from "@/types/account/index";
import styles from "./style.module.scss";
import CustomButton from "../public-button";

interface ProfileFormProps {
  data: UserProfile[];
}

export function ProfileForm({ data }: ProfileFormProps) {
  const initialData = data?.[0];
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        email: initialData.email,
        name: initialData.name,
        phone: initialData.phone,
      });
    }
  }, [initialData, form]);

  const onFinish = async (values: any) => {
    setIsSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 1000));

      console.log("Updated Values:", values);

      message.success("Information saved successfully");
    } catch (error) {
      message.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className={styles.form}
        requiredMark={false}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
          className={styles.formItem}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
          className={styles.formItem}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Phone" name="phone" className={styles.formItem}>
          <Input />
        </Form.Item>
        {/* Informational Text & Checkboxes */}{" "}
        <div className={styles.newsletterSection}>
          {" "}
          <p className={styles.legalText}>
            {" "}
            BY CREATING YOUR ACCOUNT, YOU SUBSCRIBED TO POLÈNE'S NEWSLETTER.{" "}
            <br /> BY PROVIDING YOUR PHONE NUMBER, YOU AGREED TO RECEIVE
            INFORMATIONAL SMS MESSAGES FROM POLÈNE.{" "}
          </p>{" "}
          <p className={styles.legalText}>
            {" "}
            FOR MORE INFORMATION, READ THE{" "}
            <a href="/privacy" className={styles.link}>
              {" "}
              PRIVACY POLICY{" "}
            </a>{" "}
            .{" "}
          </p>{" "}
          <p className={styles.unsubscribeText}>
            {" "}
            IF YOU WISH TO UNSUBSCRIBE, UNCHECK THE BOXES BELOW:{" "}
          </p>{" "}
          <Form.Item
            name="newsletterSubscribed"
            valuePropName="checked"
            className={styles.checkboxItem}
          >
            {" "}
            <Checkbox className={styles.customCheckbox}>
              {" "}
              I AGREE TO RECEIVE THE NEWSLETTER{" "}
            </Checkbox>{" "}
          </Form.Item>{" "}
          <Form.Item
            name="smsSubscribed"
            valuePropName="checked"
            className={styles.checkboxItem}
          >
            {" "}
            <Checkbox className={styles.customCheckbox}>
              {" "}
              I AGREE TO RECEIVE SMS MESSAGES{" "}
            </Checkbox>{" "}
          </Form.Item>{" "}
        </div>
        <div className={styles.actions}>
          <CustomButton>SAVE YOUR INFORMATION</CustomButton>

          <CustomButton changeColor>DELETE ACCOUNT</CustomButton>
        </div>
      </Form>
    </div>
  );
}
