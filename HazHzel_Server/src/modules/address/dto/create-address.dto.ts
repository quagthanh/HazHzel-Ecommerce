import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TypeAddress } from '@/shared/enums/typeAddressUser.enum'; // Đảm bảo đường dẫn đúng

export class CreateAddressDto {
  @IsMongoId()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsOptional()
  ward?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  zipCode?: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEnum(TypeAddress)
  @IsOptional()
  typeAddress?: TypeAddress;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}
