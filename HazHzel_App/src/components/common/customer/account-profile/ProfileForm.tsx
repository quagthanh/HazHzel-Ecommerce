"use client";

import { useState } from "react";
import { Form, Input, Select, Checkbox, Button, message } from "antd";
import type { UserProfile } from "@/types/account/index";
import { CustomField } from "./CustomField";
import styles from "./style.module.scss";

const { Option } = Select;

interface ProfileFormProps {
  initialData: UserProfile;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: any) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
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
      <p className={styles.userEmail}>{initialData.email}</p>

      <Form
        form={form}
        layout="vertical"
        initialValues={initialData}
        onFinish={onFinish}
        className={styles.form}
        requiredMark={false}
      >
        {/* Row 1: Title, First Name, Last Name */}
        <div className={styles.gridRow}>
          <Form.Item name="title" className={styles.formItem}>
            <CustomField label="TITLE">
              <Select
                defaultValue="None"
                variant="borderless"
                className={styles.fullSelect}
              >
                <Option value="MR">MR</Option>
                <Option value="MRS">MRS</Option>
                <Option value="MS">MS</Option>
              </Select>
            </CustomField>
          </Form.Item>

          <Form.Item
            name="firstName"
            className={styles.formItem}
            rules={[{ required: true, message: "Required" }]}
          >
            <CustomField label="FIRST NAME">
              <Input bordered={false} />
            </CustomField>
          </Form.Item>

          <Form.Item
            name="lastName"
            className={styles.formItem}
            rules={[{ required: true, message: "Required" }]}
          >
            <CustomField label="LAST NAME">
              <Input bordered={false} />
            </CustomField>
          </Form.Item>
        </div>

        {/* Row 2: Phone */}
        <Form.Item name="phoneNumber" className={styles.formItem}>
          <CustomField label="PHONE">
            <Input className={styles.phoneInput} />
          </CustomField>
        </Form.Item>

        {/* Row 3: Birthdate */}
        <Form.Item name="birthdate" className={styles.formItem}>
          <CustomField label="BIRTHDATE">
            <Input bordered={false} placeholder="MM/DD/YYYY (OPTIONAL)" />
          </CustomField>
        </Form.Item>

        {/* Informational Text & Checkboxes */}
        <div className={styles.newsletterSection}>
          <p className={styles.legalText}>
            BY CREATING YOUR ACCOUNT, YOU SUBSCRIBED TO POLÈNE'S NEWSLETTER.
            <br />
            BY PROVIDING YOUR PHONE NUMBER, YOU AGREED TO RECEIVE INFORMATIONAL
            SMS MESSAGES FROM POLÈNE.
          </p>
          <p className={styles.legalText}>
            FOR MORE INFORMATION, READ THE{" "}
            <a href="/privacy" className={styles.link}>
              PRIVACY POLICY
            </a>
            .
          </p>

          <p className={styles.unsubscribeText}>
            IF YOU WISH TO UNSUBSCRIBE, UNCHECK THE BOXES BELOW:
          </p>

          <Form.Item
            name="newsletterSubscribed"
            valuePropName="checked"
            className={styles.checkboxItem}
          >
            <Checkbox className={styles.customCheckbox}>
              I AGREE TO RECEIVE THE NEWSLETTER
            </Checkbox>
          </Form.Item>

          <Form.Item
            name="smsSubscribed"
            valuePropName="checked"
            className={styles.checkboxItem}
          >
            <Checkbox className={styles.customCheckbox}>
              I AGREE TO RECEIVE SMS MESSAGES
            </Checkbox>
          </Form.Item>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.saveBtn}
            loading={isSubmitting}
            block
          >
            SAVE YOUR INFORMATION
          </Button>
          <Button type="default" className={styles.deleteBtn} block>
            DELETE ACCOUNT
          </Button>
        </div>
      </Form>
    </div>
  );
}
