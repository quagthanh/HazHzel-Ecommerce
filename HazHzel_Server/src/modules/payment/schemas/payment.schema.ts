import { PaymentMethodType } from '@/shared/enums/methodPayment.enum';
import { statusPaymentEnum } from '@/shared/enums/statusPayment.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true, _id: false })
export class Payment {
  @Prop({
    type: String,
    enum: PaymentMethodType,
    required: true,
  })
  method: PaymentMethodType;

  @Prop({
    type: String,
    enum: statusPaymentEnum,
    default: statusPaymentEnum.PENDING,
  })
  status: statusPaymentEnum;

  @Prop({ type: Number })
  orderCode: number;

  @Prop({ type: String })
  transactionReference: string;

  @Prop({ type: Number })
  amountPaid: number;

  @Prop({ type: String })
  errorCode: string;

  @Prop({ type: String })
  errorMessage: string;

  @Prop({ type: Object })
  webhookSnapshot: Record<string, any>;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
