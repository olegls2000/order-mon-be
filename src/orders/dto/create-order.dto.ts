import { Currency } from "../entities/currency.enum"
import { IsEnum } from 'class-validator';

export class CreateOrderDto {

    paymentDescription: string

    streetAddress: string

    town: string

    country: string

    amount: number

    @IsEnum(Currency)
    currency: Currency

    paymentDueDate: Date

}