import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ResponseMessage } from '@/shared/decorators/customize';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

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

  @Get()
  @ResponseMessage('Get all orders successful')
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':userId')
  @ResponseMessage('Find order successful')
  findOne(@Param('userId') userId: string) {
    return this.orderService.findOneByUserId(userId);
  }
}
