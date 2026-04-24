"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  notification,
  Typography,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IBackendRes } from "@/types/backend";
const { Title } = Typography;
const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  // const onFinish = async (values: any) => {
  //   setLoading(true);
  //   const res = await sendRequest<IBackendRes<any>>({
  //     method: "POST",
  //     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
  //     body: {
  //       email: values.email,
  //       name: values.name,
  //       password: values.password,
  //     },
  //   });

  //   if (res?.data) {
  //     router.push(`/auth/verify/${res?.data?._id}`);
  //     setLoading(false);

  //   } else {
  //     setLoading(false);
  //     notification.error({
  //       message: "Đăng nhập thất bại",
  //       description: res?.message,
  //     });
  //   }
  // };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px" }}>
      <Card>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Đăng ký
        </Title>
        <Form
          name="basic"
          // onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Hãy nhập email!",
              },
            ]}
          >
            <Input placeholder="Email " />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu!",
              },
              {
                min: 6,
                message: "Mật khẩu phải dài hơn 6 ký tự",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu" />
          </Form.Item>

          <Form.Item label="Tên người dùng" name="name">
            <Input placeholder="Tên người dùng" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <div style={{ textAlign: "center" }}>
          Đã có tài khoản? <Link href={"/auth/login"}>Đăng nhập</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;

// "use client";
// import React, { useState } from "react";
// import { Button, Checkbox, Input, Typography, Divider } from "antd";
// import {
//   EyeInvisibleOutlined,
//   EyeOutlined,
//   GoogleOutlined,
//   FacebookOutlined,
// } from "@ant-design/icons";
// import Logo from "@/components/common/admin/login-logo";
// import styles from "@/components/common/admin/login-form/style.module.scss";
// const { Title, Text, Link } = Typography;

// interface FormData {
//   name: string;
//   email: string;
//   password: string;
//   agreed: boolean;
// }

// const LoginForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     password: "",
//     agreed: false,
//   });

//   const handleSubmit = async () => {
//     setLoading(true);
//     // Xử lý đăng nhập
//     setTimeout(() => setLoading(false), 1000);
//   };

//   return (
//     <div className={styles.loginFormContainer}>
//       <div className={styles.loginFormWrapper}>
//         <Logo />

//         <Title level={2} className={styles.loginFormTitle}>
//           Create an account
//         </Title>

//         <div className={styles.loginForm}>
//           <div className={styles.formField}>
//             <label className={styles.formLabel}>Name</label>
//             <Input
//               placeholder="Enter your name"
//               size="large"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               className={styles.formInput}
//             />
//           </div>

//           <div className={styles.formField}>
//             <label className={styles.formLabel}>Email</label>
//             <Input
//               type="email"
//               placeholder="Enter your mail"
//               size="large"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               className={styles.formInput}
//             />
//           </div>

//           <div className={styles.formField}>
//             <label className={styles.formLabel}>Password</label>
//             <Input.Password
//               placeholder="Enter your password"
//               size="large"
//               value={formData.password}
//               onChange={(e) =>
//                 setFormData({ ...formData, password: e.target.value })
//               }
//               iconRender={(visible) =>
//                 visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
//               }
//               className={styles.formInput}
//             />
//           </div>

//           <div className={styles.formCheckbox}>
//             <Checkbox
//               checked={formData.agreed}
//               onChange={(e) =>
//                 setFormData({ ...formData, agreed: e.target.checked })
//               }
//             >
//               <Text className={styles.checkboxText}>
//                 I agree to all the <Link>Terms & Conditions</Link>
//               </Text>
//             </Checkbox>
//           </div>

//           <Button
//             type="primary"
//             size="large"
//             block
//             loading={loading}
//             onClick={handleSubmit}
//             className={styles.submitButton}
//           >
//             Sign up
//           </Button>

//           <Divider className={styles.formDivider}>
//             <Text type="secondary" className={styles.dividerText}>
//               Or
//             </Text>
//           </Divider>

//           <div className={styles.socialButtons}>
//             <Button
//               size="large"
//               icon={<GoogleOutlined />}
//               className={styles.socialButton}
//             >
//               Google
//             </Button>
//             <Button
//               size="large"
//               icon={<FacebookOutlined />}
//               className={styles.socialButton}
//             >
//               Facebook
//             </Button>
//           </div>

//           <div className={styles.loginLink}>
//             <Text className={styles.loginLinkText}>
//               Already have an account?{" "}
//               <Link className={styles.loginLinkAction}>Log in</Link>
//             </Text>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
