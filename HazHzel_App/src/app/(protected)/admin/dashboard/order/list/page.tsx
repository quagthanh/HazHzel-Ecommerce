import OrderListClient from "@/components/common/admin/order/order-list";
import { getOrdersForAdmin } from "@/services/order.api";
import { AdminPageProps } from "@/types/product";

const OrderListPage = async ({ searchParams }: AdminPageProps) => {
  const current = Number(searchParams?.current) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;

  let orders = [];
  let meta = { current: 1, pageSize: 10, total: 0, pages: 0 };

  try {
    const res = await getOrdersForAdmin({
      current,
      pageSize,
    });
    const backendData = res?.data;
    if (backendData) {
      orders = backendData.result || [];
      meta = backendData.meta || meta;
    } else {
      console.error("API returned 200 but cannot find key 'data'");
    }
  } catch (error: any) {
    console.error("Error when calling API Order:", error?.message);
  }

  return <OrderListClient initialData={orders} initialMeta={meta} />;
};

export default OrderListPage;
