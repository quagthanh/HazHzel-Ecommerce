import { ProductSortType } from '@/shared/enums/productSortType.enum';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductFilterDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.split(','))
  filterCategory: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.split(','))
  filterBrand: string[] | string;

  @IsOptional()
  @IsString({ each: true })
  filterSize: string;

  @IsOptional()
  @IsString({ each: true })
  filterColor: string;

  @IsOptional()
  @IsNumber()
  minPrice: number;

  @IsOptional()
  @IsNumber()
  maxPrice: number;

  @IsOptional()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  @IsEnum(ProductSortType)
  sort: string;

  @IsOptional()
  @Type(() => Number)
  current: number = 1;

  @IsOptional()
  @Type(() => Number)
  pageSize: number = 10;
}
