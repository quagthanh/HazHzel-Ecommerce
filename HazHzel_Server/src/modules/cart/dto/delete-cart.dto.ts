import { IsNotEmpty } from 'class-validator';

export class DeleteCartItemDto {
  @IsNotEmpty()
  cartItemId: string;
}
