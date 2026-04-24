"use client";

import AnalyticsPreview from "../../login-analytics-preview";
import styles from "@/components/common/auth/login/login-page/style.module.scss";
import LoginForm from "../../login-form/login-form";
const Login = () => {
  return (
    <div className={styles.loginPage}>
      <LoginForm />
      <AnalyticsPreview />
    </div>
  );
};

export default Login;
