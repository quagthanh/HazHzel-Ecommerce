"use client";

import { useRef } from "react";
import { useAuthStore } from "@/library/stores/useAuthStore";

export default function AuthInitializer({ user }: { user: any }) {
  const isInitialized = useRef(false);

  if (!isInitialized.current && user) {
    useAuthStore.setState({
      userDetail: user,
      userId: user._id || user.id,
    });
    isInitialized.current = true;
  }

  return null;
}
