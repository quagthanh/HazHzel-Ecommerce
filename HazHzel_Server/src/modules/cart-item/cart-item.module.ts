import { forwardRef, Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartItem, CartItemSchema } from './schemas/cart-item.schema';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    forwardRef(() => CartModule),
    MongooseModule.forFeature([
      { name: CartItem.name, schema: CartItemSchema },
    ]),
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [MongooseModule],
})
export class CartItemModule {}
