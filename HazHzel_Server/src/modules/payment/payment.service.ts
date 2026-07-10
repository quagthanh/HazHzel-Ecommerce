// src/modules/payment/payment.service.ts
import { Injectable, Inject, BadRequestException, Logger } from '@nestjs/common';
import { PayOS } from '@payos/node'; // Đảm bảo import đúng type
import { PAYOS_INSTANCE } from './providers/payos.provider';
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';
// Import OrderService hoặc Repository của bạn

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @Inject(PAYOS_INSTANCE) private readonly payos: PayOS,
    // private readonly orderService: OrderService,
  ) { }

  async createPaymentLink(createPaymentDto: CreatePaymentLinkDto) {
    try {
      // 1. (Tùy chọn) Lưu log giao dịch vào DB với trạng thái PENDING
      // 2. Chuẩn bị payload (Lưu ý: orderCode phải là số)
      const paymentData = {
        orderCode: createPaymentDto.orderCode,
        amount: createPaymentDto.amount,
        description: createPaymentDto.description || 'Thanh toan don hang',
        returnUrl: 'https://your-domain.com/success',
        cancelUrl: 'https://your-domain.com/cancel',
        // ... (Thêm items nếu cần)
      };

      // 3. Gọi PayOS SDK (Cú pháp mới)
      const paymentLink = await this.payos.paymentRequests.create(paymentData);
      return paymentLink.checkoutUrl;

    } catch (error) {
      this.logger.error('Lỗi khi tạo link thanh toán PayOS', error);
      throw new BadRequestException('Không thể tạo link thanh toán');
    }
  }

  async handleWebhook(webhookBody: any) {
    try {
      // 1. Xác thực Webhook (Cú pháp mới)
      const webhookData = this.payos.webhooks.verify(webhookBody);

      // 2. Logic xử lý sau khi xác thực thành công (như đã nói ở câu trả lời trước)
      // - Mở Transaction
      // - Lock Row
      // - Check Idempotency (Order đã SUCCESS chưa?)
      // - Update Order Status
      // - Commit Transaction

      return { message: 'Webhook xử lý thành công' };
    } catch (error) {
      this.logger.error('Lỗi khi xử lý Webhook PayOS', error);
      throw new BadRequestException('Webhook không hợp lệ'); // Controller sẽ hứng lỗi này
    }
  }
}