"use client";

import type { AccountData } from "@/types/account/index";
import { WelcomeCard } from "../account-welcome-card/index";
import { LatestOrderCard } from "../account-latest-order-card/index";
import { AssistanceCard } from "../account-assistance-card";
import styles from "./style.module.scss";

interface AccountOverviewProps {
  account: AccountData;
}

export function AccountOverview({ account }: AccountOverviewProps) {
  return (
    <main className={styles.content}>
      {/* Top: welcome + editorial image */}
      <WelcomeCard user={account.user} />

      {/* Bottom: two-col grid */}
      <div className={styles.bottomGrid}>
        <LatestOrderCard order={account.latestOrder} />
        <AssistanceCard />
      </div>
    </main>
  );
}
