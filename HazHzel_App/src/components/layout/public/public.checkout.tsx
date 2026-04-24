"use client";

import CheckoutPage from "@/components/common/customer/checkout";
import { useCartStore } from "@/library/stores/useCartStore";
import { redirect } from "next/navigation";

const PublicCheckoutPage = () => {
  const { items } = useCartStore();
  if (!items || items.length == 0) {
    redirect("/cart");
  }
  return <CheckoutPage />;
};
export default PublicCheckoutPage;
