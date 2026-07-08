"use client";

import { Row, Col } from "antd";
import DashboardHeader from "./widgets/dashboard-header";
import DashboardMetrics from "./widgets/dashboard-metrics";
import SalesChart from "./widgets/sales-chart";
import TopProducts from "./widgets/top-products";
import CategoryChart from "./widgets/category-chart";
import RecentOrders from "./widgets/recent-orders";
import RevenueBreakdown from "./widgets/revenue-breakdown";
import ShippingOverview from "./widgets/shipping-overview";
import PaymentMethods from "./widgets/payment-methods";
import TopCountries from "./widgets/top-countries";
import LowStockAlert from "./widgets/low-stock-alert";
import CustomerStats from "./widgets/customer-stats";
import TrafficSources from "./widgets/traffic-sources";
import TrafficChart from "./widgets/traffic-chart";
import DistributionChart from "./widgets/distribution-chart";
import EcommerceActivity from "./widgets/ecommerce-activity";

interface DashboardClientProps {
  initialData: any;
}

const DashboardClient = ({ initialData }: DashboardClientProps) => {
  return (
    <div
      style={{
        padding: "24px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f9",
      }}
    >
      <DashboardHeader />

      <div style={{ marginBottom: "24px" }} />

      <DashboardMetrics
        data={initialData.analytics?.heroMetrics}
        chartData={initialData.analytics?.salesChart}
      />

      <div style={{ marginBottom: "24px" }} />

      <Row gutter={[24, 24]}>
        <Col xs={24} xl={16}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <SalesChart data={initialData.analytics?.salesChart} />

            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <TopProducts data={initialData.analytics?.topProducts} />
              </Col>
              <Col xs={24} md={12}>
                <CategoryChart data={initialData.analytics?.categorySales} />
              </Col>
            </Row>

            <RecentOrders data={initialData.recentOrders} />

            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <RevenueBreakdown />
              </Col>
              <Col xs={24} md={12}>
                <ShippingOverview />
              </Col>
            </Row>

            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <PaymentMethods data={initialData.analytics?.paymentMethods} />
              </Col>
              <Col xs={24} md={12}>
                <TopCountries />
              </Col>
            </Row>
          </div>
        </Col>

        <Col xs={24} xl={8}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <LowStockAlert data={initialData.analytics?.lowStockAlerts} />
            <CustomerStats
              totalUsers={initialData.analytics?.heroMetrics?.newCustomers || 0}
            />
            <TrafficSources />
            <TrafficChart />
            <DistributionChart />
            <EcommerceActivity />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardClient;
