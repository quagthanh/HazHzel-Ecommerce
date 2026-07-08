import DashboardClient from "@/components/common/admin/overview/dashboard-overview";
import {
  getDashboardAnalytics,
  getRecentOrdersForDashboard,
} from "@/services/dashboard.api";

interface DashboardPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const days = parseInt((searchParams.days as string) || "365", 10);

  const [analyticsResult, ordersResult] = await Promise.allSettled([
    getDashboardAnalytics(days),
    getRecentOrdersForDashboard(),
  ]);

  let analyticsData = {};
  if (analyticsResult.status === "fulfilled" && analyticsResult.value?.data) {
    analyticsData = analyticsResult.value.data;
  }

  let recentOrders = [];
  if (ordersResult.status === "fulfilled") {
    const resValue = ordersResult.value;
    if (Array.isArray(resValue)) {
      recentOrders = resValue;
    } else if (resValue?.data?.result) {
      recentOrders = resValue.data.result;
    } else if (Array.isArray(resValue?.data)) {
      recentOrders = resValue.data;
    }
  }

  const dashboardData = {
    analytics: analyticsData,
    recentOrders: recentOrders,
  };

  return <DashboardClient initialData={dashboardData} />;
};

export default DashboardPage;
