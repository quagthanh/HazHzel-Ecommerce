import PublicCheckoutPage from "@/components/layout/public/public.checkout";
import { useCartStore } from "@/library/stores/useCartStore";
import { redirect } from "next/navigation";

const CheckOutPage = () => {
  return <PublicCheckoutPage />;
};
export default CheckOutPage;
