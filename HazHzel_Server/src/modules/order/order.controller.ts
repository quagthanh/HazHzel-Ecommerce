import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Query,
  Patch,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ResponseMessage } from '@/shared/decorators/customize';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdateOrderPaymentStatusDto } from './dto/update-order-payment-status.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post('/checkout')
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    const { user: userId } = req;
    return this.orderService.checkout(userId, createOrderDto);
  }

  @Get('me')
  @ResponseMessage('Get all orders successful')
  findMyOrder(@Request() req) {
    const { user } = req;
    const userId = user._id;
    return this.orderService.findMyOrder(userId);
  }

  @Get(':id')
  @ResponseMessage('Find order successful')
  findOne(@Param('id') id: string,) {
    return this.orderService.findOne(id);
  }

  @Get('by-userId/:userId')
  @ResponseMessage('Find order successful')
  findOneByUserId(@Param('userId') userId: string) {
    return this.orderService.findOneByUserId(userId);
  }

  @Get()
  @ResponseMessage('Get all orders successful')
  findAll(
    @Query() query: string,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,) {

    return this.orderService.findAll(query,
      Number(current) || 1,
      Number(pageSize) || 10,);
  }

  @Patch(':id/status')
  @ResponseMessage('Update order status successfully')
  updateStatus(@Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    return this.orderService.updateStatus(id, updateOrderStatusDto)
  }

  @Patch(':id/payment-status')
  @ResponseMessage('Update order payment status successfully')
  updatePaymentStatus(@Param('id') id: string,
    @Body() updateOrderPaymentStatusDto: UpdateOrderPaymentStatusDto) {
    return this.orderService.updatePaymentStatus(id, updateOrderPaymentStatusDto)
  }
}

