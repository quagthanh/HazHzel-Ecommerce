import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { AddToCartDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { DeleteCartItemDto } from '../cart/dto/delete-cart.dto';
import { ResponseMessage } from '@/shared/decorators/customize';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}
  @Post()
  create(@Body() createDto: AddToCartDto) {
    return this.cartItemService.create(createDto);
  }

  @Get()
  findAll() {
    return this.cartItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItemService.findOne(id);
  }

  @Patch(':cartItemId')
  @ResponseMessage('Update cart items successfully')
  update(
    @Req() req,
    @Param('cartItemId') cartItemId: string,
    @Body() updateDto: UpdateCartItemDto,
  ) {
    const { user: _id } = req;
    return this.cartItemService.update(_id, cartItemId, updateDto);
  }

  @Delete()
  @ResponseMessage('Delete cart items successfully')
  removeCartItem(@Req() req, @Body() deleteCartItemDto: DeleteCartItemDto) {
    const { user: _id } = req;
    return this.cartItemService.removeCartItem(_id, deleteCartItemDto);
  }
}
