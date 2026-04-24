import { IsNotEmpty } from 'class-validator';

export class AuthResponseDto {
  user: UserResponseDto;
  access_token: string;
}
export class UserResponseDto {
  @IsNotEmpty({ message: 'Id is required' })
  _id: string;
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
  @IsNotEmpty({ message: 'Role is required' })
  roles: Array<string> | string;
}
