import { IsEmail, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
export class CreateUserDto {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;
  @IsOptional()
  phone?: string;
  @IsOptional()
  address?: string;
  @IsOptional()
  image?: string;
  @IsOptional()
  @IsMongoId({ each: true })
  roles?: Types.ObjectId[];
}
