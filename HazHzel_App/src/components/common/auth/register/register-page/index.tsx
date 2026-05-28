"use client";

import AnalyticsPreview from "../../login-analytics-preview";
import styles from "@/components/common/auth/register/register-page/style.module.scss";
import RegisterForm from "../../register-form";

const Register = () => {
  return (
    <div className={styles.registerPage}>
      <RegisterForm />
      <AnalyticsPreview />
    </div>
  );
};

export default Register;
