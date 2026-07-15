import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Model } from 'mongoose';
import { CartService } from '../cart/cart.service';
import { statusOrderAdminEnum } from '@/shared/enums/statusOrder.enum';
import { InventoryService } from '../inventory/inventory.service';
import { pagination, validOrderTransitions } from '@/shared/helpers/utils';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdateOrderPaymentStatusDto } from './dto/update-order-payment-status.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private cartService: CartService,
    private inventoryService: InventoryService,
  ) { }
  async checkout(userId: string, createOrderDto: CreateOrderDto) {
    const { shippingAddress, paymentMethod } = createOrderDto;

    const cart = await this.cartService.getCart(userId);
    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const orderItems = [];
    let subTotal = 0;
    const itemsToReduceInSTock = [];
    for (const item of cart.items) {
      const product = item.productId as any;
      const variant = item.variantId as any;
      if (!product || !variant) {
        throw new BadRequestException('Product or variant not found');
      }
      itemsToReduceInSTock.push({
        variantId: variant._id.toString(),
        quantity: item.quantity,
      });
      orderItems.push({
        productId: product._id,
        variantId: variant._id,
        name: variant.name,
        price: variant.currentPrice,
        quantity: item.quantity,
        image: product.images[0].secure_url,
      });

      subTotal += variant.currentPrice * item.quantity;
    }
    await this.inventoryService.reduceStock(itemsToReduceInSTock);
    const shippingCost = 30000;

    const discountObj = null;
    const discountAmount = 0;

    const totalPrice = subTotal + shippingCost - discountAmount;

    const newOrder = await this.orderModel.create({
      userId,
      items: orderItems,
      subTotal,
      shippingCost,
      totalPrice,
      shippingAddress,
      status: statusOrderAdminEnum.PENDING,
      payment: {
        method: paymentMethod,
        status: statusOrderAdminEnum.PENDING,
        paymentDate: new Date(),
      },
      discount: discountObj,
    });

    await this.cartService.removeCart(userId);

    return newOrder;
  }

  async findMyOrder(userId: string) {
    return this.findOneByUserId(userId);
  }

  async findAll(query: string, current: number = 1, pageSize: number = 5) {
    return pagination(this.orderModel, query, current, pageSize);
  }

  async findOneByUserId(userId: string) {
    let order = await this.orderModel
      .find({ userId })
      .sort({ createdAt: 1 })
      .exec();
    if (order.length < 1) {
      order = [];
    }
    return order;
  }

  async findOne(id: string) {
    return this.orderModel.findById(id).populate('userId', 'name email').exec();
  }

  async updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto) {
    const order = await this.orderModel.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const allowedTransitions = validOrderTransitions[order.status];

    if (!allowedTransitions.includes(updateOrderStatusDto.status)) {
      throw new BadRequestException(
        `Cannot change order status from ${order.status} to ${updateOrderStatusDto.status}`,
      );
    }

    order.status = updateOrderStatusDto.status;

    await order.save();

    return order;
  }

  async updatePaymentStatus(
    id: string,
    updateOrderPaymentStatusDto: UpdateOrderPaymentStatusDto,
  ) {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      {
        $set: {
          'payment.status': updateOrderPaymentStatusDto.paymentStatus,
          'payment.paymentDate': new Date(),
        },
      },
      {
        new: true,
      },
    );

    return order;
  }
}
