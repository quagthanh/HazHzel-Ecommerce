import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from '@/modules/address/dto/create-address.dto';
import { statusOrderEnum } from '@/shared/enums/statusOrder.enum';
import { PaymentMethodType } from '@/shared/enums/methodPayment.enum';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  shippingAddress: CreateAddressDto;

  @IsOptional()
  discountCode?: string;

  @IsEnum(PaymentMethodType)
  @IsNotEmpty()
  paymentMethod: PaymentMethodType;

  @IsOptional()
  @IsString()
  note?: string;
}
