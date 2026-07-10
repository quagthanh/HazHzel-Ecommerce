import { IsNotEmpty } from 'class-validator';

export class CreatePaymentLinkDto {
    @IsNotEmpty()
    orderCode: number;

    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    description: string;
}
