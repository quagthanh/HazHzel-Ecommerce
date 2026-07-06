import {
    IsEnum,
    IsNotEmpty,
} from 'class-validator';
import { statusPaymentEnum } from '@/shared/enums/statusPayment.enum';

export class UpdateOrderPaymentStatusDto {
    @IsNotEmpty()
    @IsEnum(statusPaymentEnum)
    paymentStatus: statusPaymentEnum;
}
