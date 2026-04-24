import { GenderType } from '@/shared/enums/typeGenderProduct.enm';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsMongoId()
  categoryId: string;

  @IsMongoId()
  supplierId: string;

  @IsOptional()
  views: number;

  @IsOptional()
  gender: GenderType;

  @IsOptional()
  images: string[];

  @IsOptional()
  status: string;

  @IsOptional()
  isHot?: boolean;

  @IsOptional()
  isSale?: boolean;

  @IsOptional()
  isNewArrival?: boolean;
}
