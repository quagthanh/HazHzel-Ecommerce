import {
  Address,
  AddressSchema,
} from '@/modules/address/schemas/address.schema';
import {
  Payment,
  PaymentSchema,
} from '@/modules/payment/schemas/payment.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { OrderItem, OrderItemSchema } from './order-item.schema';
import { OrderDiscount, OrderDiscountSchema } from './order-discount.schema';
import { statusOrderAdminEnum } from '@/shared/enums/statusOrder.enum';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [OrderItemSchema], default: [] })
  items: OrderItem[];

  @Prop({ required: true })
  subTotal: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ type: AddressSchema, required: true })
  shippingAddress: Address;

  @Prop({ type: Number, default: 0 })
  shippingCost: number;

  @Prop({ type: OrderDiscountSchema })
  discount: OrderDiscount;

  @Prop({
    type: String,
    enum: statusOrderAdminEnum,
    default: statusOrderAdminEnum.PENDING,
  })
  status: statusOrderAdminEnum;

  @Prop({ type: PaymentSchema })
  payment: Payment;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
