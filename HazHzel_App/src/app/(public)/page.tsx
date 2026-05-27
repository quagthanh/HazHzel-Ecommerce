import PublicHomePage from "@/components/layout/public/home/public.home";
import { PageProps } from "@/types/interface";

const CustomerPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const isCheckoutSuccess = params?.checkout_success === "true";

  return <PublicHomePage shouldClearCart={isCheckoutSuccess} />;
};
export default CustomerPage;
