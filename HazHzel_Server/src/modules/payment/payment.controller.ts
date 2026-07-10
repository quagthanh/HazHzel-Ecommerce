// src/modules/payment/payment.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  // API cho Frontend gọi để lấy Checkout URL
  @Post('payos/create')
  async createPaymentLink(@Body() createPaymentDto: CreatePaymentLinkDto) {
    const checkoutUrl = await this.paymentService.createPaymentLink(createPaymentDto);
    return { checkoutUrl };
  }

  // API Webhook cho PayOS gọi ngược về
  @Post('payos/webhook')
  @HttpCode(HttpStatus.OK) // Đảm bảo trả về 200 OK cho PayOS
  async handlePayosWebhook(@Body() webhookBody: any) {
    // Để NestJS xử lý lỗi (BadRequestException từ Service sẽ tự động thành 400)
    await this.paymentService.handleWebhook(webhookBody);
    return { success: true }; // Hoặc đơn giản là một string 'OK'
  }
}