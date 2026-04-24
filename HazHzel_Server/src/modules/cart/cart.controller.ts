import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { DeleteCartItemDto } from './dto/delete-cart.dto';
import { ResponseMessage } from '@/shared/decorators/customize';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ResponseMessage('Get cart successfully')
  getCart(@Req() req) {
    const { user: _id } = req;
    return this.cartService.getCart(_id);
  }
  @Post(':userId')
  @ResponseMessage('Add product successfully')
  addToCart(@Body() addCart: CreateCartDto, @Param('userId') userId: string) {
    return this.cartService.addToCart(userId, addCart);
  }

  @Delete('/clear/:userId')
  removeCart(@Param('userId') userId: string) {
    return this.cartService.removeCart(userId);
  }
}
