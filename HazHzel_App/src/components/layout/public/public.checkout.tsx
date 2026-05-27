"use client";

import CheckoutPage from "@/components/common/customer/checkout";
import { useCartStore } from "@/library/stores/useCartStore";
import { redirect } from "next/navigation";

const PublicCheckoutPage = () => {
  const items = useCartStore((state) => state.items);
  if (!items?.length) {
    redirect("/cart");
  }
  return <CheckoutPage />;
};
export default PublicCheckoutPage;
