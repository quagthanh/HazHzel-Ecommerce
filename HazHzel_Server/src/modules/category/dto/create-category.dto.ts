import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsMongoId({ message: 'Parent Category Id is not valid' })
  parentCategory?: string;

  @IsOptional()
  status?: string;
}
