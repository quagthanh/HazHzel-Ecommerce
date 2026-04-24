import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartItem } from './schemas/cart-item.schema';
import { Model, Types } from 'mongoose';
import { AddToCartDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartService } from '../cart/cart.service';
import { DeleteCartItemDto } from '../cart/dto/delete-cart.dto';
import { Cart } from '../cart/schemas/cart.schema';
@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem.name) private cartItemModel: Model<CartItem>,
    private readonly cartService: CartService,
    @InjectModel(Cart.name)
    private readonly cartModel: Model<Cart>,
  ) {}
  async create(createDto: AddToCartDto) {
    return this.cartItemModel.create({
      productId: new Types.ObjectId(createDto.productId),
      quantity: createDto.quantity,
    });
  }

  async findAll() {
    return this.cartItemModel.find().populate('productId');
  }

  async findOne(id: string) {
    const item = await this.cartItemModel.findById(id).populate('productId');
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(_id, cartItemId: string, updateDto: UpdateCartItemDto) {
    const { quantity } = updateDto;
    if (quantity < 0) {
      return;
    }
    const updatedItem = await this.cartItemModel.findByIdAndUpdate(
      cartItemId,
      { quantity: updateDto.quantity },
      { new: true },
    );
    if (!updatedItem)
      throw new NotFoundException('Cart Item not found when updating');
    return this.cartService.getCart(_id);
  }

  async removeCartItem(_id: string, deleteCartItemDto: DeleteCartItemDto) {
    const { cartItemId } = deleteCartItemDto;
    const deletedItem = await this.cartItemModel.findByIdAndDelete(cartItemId);
    if (!deletedItem) {
      throw new BadRequestException('Cart Item not found');
    }
    const deleteCart = await this.cartModel.findOneAndUpdate(
      { userId: _id },
      { $pull: { items: cartItemId } },
      { new: true },
    );
    if (!deleteCart) {
      throw new BadRequestException(
        'Cart not found for user(cart item is deleted) when removing cart item',
      );
    }
    return this.cartService.getCart(_id);
  }
}
