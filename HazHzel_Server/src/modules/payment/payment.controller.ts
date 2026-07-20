import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Public } from '@/shared/decorators/customize';
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post('payos/create')
  async createPaymentLink(@Body() createPaymentLinkDto: CreatePaymentLinkDto) {
    const checkoutUrl = await this.paymentService.createPaymentLink(createPaymentLinkDto.orderId);
    return { checkoutUrl };
  }
  @Public()
  @Post('payos/webhook')
  @HttpCode(HttpStatus.OK)
  async handlePayosWebhook(@Body() webhookBody: any) {
    await this.paymentService.handleWebhook(webhookBody);
    return { success: true };
  }
}