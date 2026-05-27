"use client";
import { useEffect, useRef } from "react";
import { useCartStore } from "@/library/stores/useCartStore";

export default function CartInitializer({
  shouldClear,
}: {
  shouldClear: boolean;
}) {
  const clearCart = useCartStore((state) => state.clearCart);
  const isExecuted = useRef(false);

  useEffect(() => {
    if (shouldClear && !isExecuted.current) {
      clearCart();
      isExecuted.current = true;

      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", "/");
      }
    }
  }, [shouldClear, clearCart]);

  return null;
}
