import { IsEnum, IsNotEmpty } from 'class-validator';
import { statusOrderAdminEnum } from '@/shared/enums/statusOrder.enum';

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsEnum(statusOrderAdminEnum)
  status: statusOrderAdminEnum;
}
