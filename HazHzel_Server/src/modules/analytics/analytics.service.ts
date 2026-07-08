import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import dayjs from 'dayjs';
import { Order } from '../order/schemas/order.schema';
import { User } from '../users/schemas/user.schema';
import { Variant } from '../variant/schemas/variant.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Variant.name) private readonly variantModel: Model<Variant>,
  ) {}

  async getDashboardOverview(days: number) {
    const endDate = dayjs().toDate();
    const startDate = dayjs().subtract(days, 'day').toDate();

    // Common filter for Orders: within the selected date range and not cancelled
    const orderMatchCondition = {
      createdAt: { $gte: startDate, $lte: endDate },
      status: { $ne: 'CANCELLED' },
    };
    const LOW_STOCK_THRESHOLD = 10;

    // Execute all aggregation pipelines in parallel
    const [
      heroMetricsResult,
      newCustomersCount,
      salesChartData,
      topProductsData,
      paymentMethodsData,
      categorySalesData,
      lowStockData,
    ] = await Promise.all([
      //Pipeline 1: Hero Metrics (Total Revenue, Total Orders, Average Order Value)
      this.orderModel.aggregate([
        { $match: orderMatchCondition },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalPrice' },
            totalOrders: { $sum: 1 },
            averageOrderValue: { $avg: '$totalPrice' },
          },
        },
      ]),

      //Pipeline 2: Count New Customers (User collection)
      this.userModel.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate },
        roles: { $exists: true },
      }),

      //Pipeline 3: Sales Chart (Revenue grouped by day)
      this.orderModel.aggregate([
        { $match: orderMatchCondition },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            revenue: { $sum: '$totalPrice' },
            orders: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      //Pipeline 4: Top Selling Products
      this.orderModel.aggregate([
        { $match: orderMatchCondition },
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.productId',
            name: { $first: '$items.name' },
            image: { $first: '$items.image' },
            totalSold: { $sum: '$items.quantity' },
            revenue: {
              $sum: { $multiply: ['$items.quantity', '$items.price'] },
            },
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 5 },
      ]),

      //Pipeline 5: Payment Method Statistics
      this.orderModel.aggregate([
        {
          $match: {
            ...orderMatchCondition,
            'payment.status': 'COMPLETED', // Only include successful payments
          },
        },
        {
          $group: {
            _id: '$payment.method',
            revenue: { $sum: '$totalPrice' },
            transactions: { $sum: 1 },
          },
        },
        { $sort: { revenue: -1 } },
      ]),
      //Pipeline 6: Revenue by Category
      this.orderModel.aggregate([
        { $match: orderMatchCondition },
        { $unwind: '$items' },
        {
          $lookup: {
            from: 'products',
            localField: 'items.productId',
            foreignField: '_id',
            as: 'productDetail',
          },
        },
        {
          $unwind: { path: '$productDetail', preserveNullAndEmptyArrays: true },
        },
        {
          // Join Category collection to retrieve category name
          $lookup: {
            from: 'categories',
            localField: 'productDetail.categoryId',
            foreignField: '_id',
            as: 'categoryDetail',
          },
        },
        {
          $unwind: {
            path: '$categoryDetail',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            // Group by category name, fallback to "Uncategorized"
            _id: { $ifNull: ['$categoryDetail.name', 'Uncategorized'] },
            value: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
          },
        },
        { $sort: { value: -1 } },
      ]),

      //Pipeline 7: Low Stock Alerts
      this.variantModel.aggregate([
        {
          $match: {
            stock: { $lte: LOW_STOCK_THRESHOLD },
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'parentProduct',
          },
        },
        {
          $unwind: { path: '$parentProduct', preserveNullAndEmptyArrays: true },
        },
        {
          $project: {
            _id: 1,
            variantName: { $ifNull: ['$name', 'Default Variant'] },
            productName: {
              $ifNull: ['$parentProduct.name', 'Unknown Product'],
            },
            stockLeft: '$stock',
          },
        },
        { $sort: { stockLeft: 1 } },
        { $limit: 5 },
      ]),
    ]);

    // Format the aggregated data before returning it to the frontend
    const metrics = heroMetricsResult[0] || {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
    };

    return {
      heroMetrics: {
        totalRevenue: metrics.totalRevenue,
        totalOrders: metrics.totalOrders,
        newCustomers: newCustomersCount,
        averageOrderValue: Math.round(metrics.averageOrderValue || 0),
      },
      salesChart: salesChartData.map((item) => ({
        date: item._id,
        revenue: item.revenue,
        orders: item.orders,
      })),
      topProducts: topProductsData.map((item) => ({
        productId: item._id,
        name: item.name,
        image: item.image,
        totalSold: item.totalSold,
        revenue: item.revenue,
      })),
      paymentMethods: paymentMethodsData.map((item) => ({
        method: item._id,
        revenue: item.revenue,
        transactions: item.transactions,
      })),
      categorySales: categorySalesData.map((item) => ({
        categoryName: item._id,
        sales: item.value,
      })),
      lowStockAlerts: lowStockData.map((item) => ({
        variantId: item._id,
        name:
          item.productName +
          (item.variantName !== 'Default Variant'
            ? ` (${item.variantName})`
            : ''),
        stockLeft: item.stockLeft,
      })),
    };
  }
}
