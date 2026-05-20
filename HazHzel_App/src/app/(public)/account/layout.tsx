import { ReactNode } from "react";
import { AccountSidebar } from "@/components/common/customer/account-sidebar/index";
import styles from "./layout.module.scss";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.accountLayout}>
      <AccountSidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
