import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PayOSProvider } from './providers/payos.provider';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [PaymentController],
  providers: [PaymentService, PayOSProvider],
  exports: [PaymentService]
})
export class PaymentModule { }
