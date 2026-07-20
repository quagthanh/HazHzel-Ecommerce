import { IsNotEmpty } from 'class-validator';

export class CreatePaymentLinkDto {
    @IsNotEmpty()
    orderId: string
}
