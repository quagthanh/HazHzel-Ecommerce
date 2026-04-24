import { Injectable } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePassword } from '@/shared/helpers/utils';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import {
  ChangePasswordDto,
  CodeAuthDto,
  RetryCodeDto,
  RetryPasswordDto,
} from './dto/checkcode-auth.dto';
import { AuthResponseDto, UserResponseDto } from './dto/auth-response.dto';
import { RoleService } from '@/modules/role/role.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    const isValidPassword = await comparePassword(pass, user.password);

    if (!isValidPassword) {
      return null;
    }
    return user;
  }
  async login(user: UserResponseDto) {
    const payload = { username: user.email, sub: user._id, roles: user.roles };
    const role = await this.roleService.findOne(user.roles[0]);
    let result = {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles || role,
      },
      access_token: this.jwtService.sign(payload),
    } as AuthResponseDto;
    return result;
  }
  handleRegister = async (registerDto: CreateAuthDto) => {
    return await this.usersService.handleRegister(registerDto);
  };
  checkCode = async (codeDto: CodeAuthDto) => {
    return await this.usersService.handleActive(codeDto);
  };
  retryActive = async (retryCodeDto: RetryCodeDto) => {
    return await this.usersService.retryActive(retryCodeDto);
  };
  retryPassword = async (retryPasswordDto: RetryPasswordDto) => {
    return await this.usersService.retryPassword(retryPasswordDto);
  };
  changePassword = async (changePasswordDto: ChangePasswordDto) => {
    return await this.usersService.changePassword(changePasswordDto);
  };
}
