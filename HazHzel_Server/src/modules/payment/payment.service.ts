import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../order/schemas/order.schema';
import { statusOrderAdminEnum } from '@/shared/enums/statusOrder.enum';
import { PAYOS_INSTANCE } from './providers/payos.provider';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PAYOS_INSTANCE) private readonly payOS: any,
    private readonly redisService: RedisService,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) { }

  async createPaymentLink(orderId: string) {
    const order = await this.orderModel.findById(orderId);
    if (!order) throw new BadRequestException('Order is not exist');

    const orderCode = Number(String(Date.now()).slice(-6)) + Math.floor(Math.random() * 1000);

    order.payment.orderCode = orderCode;
    await order.save();

    const body = {
      orderCode: orderCode,
      amount: order.totalPrice,
      description: `Pay order`,
      cancelUrl: 'http://localhost:3000/checkout/cancel',
      returnUrl: 'http://localhost:3000/checkout/success',
    };

    const paymentLink = await this.payOS.paymentRequests.create(body);
    return paymentLink.checkoutUrl;
  }

  async handleWebhook(webhookBody: any) {
    try {
      const webhookData = await this.payOS.webhooks.verify(webhookBody);

      const { orderCode, amount, reference, code } = webhookData;


      if (code === '00') {
        const updatedOrder = await this.orderModel.findOneAndUpdate(
          { 'payment.orderCode': Number(orderCode) },
          {
            $set: {
              status: statusOrderAdminEnum.COMPLETED,
              'payment.status': 'SUCCESS',
              'payment.transactionReference': reference,
              'payment.amountPaid': amount,
              'payment.webhookSnapshot': webhookData,
            }
          },
          { new: true }
        );

        if (!updatedOrder) {
          return { success: false, message: 'Order not found' };
        }
      }

      return { success: true };
    } catch (error: any) {
      console.error('Webhook Error:', error.message);
      return { success: false };
    }
  }
}