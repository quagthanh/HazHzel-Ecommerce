import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  @IsMongoId()
  productId: string;

  @IsNotEmpty()
  @IsMongoId()
  variantId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
