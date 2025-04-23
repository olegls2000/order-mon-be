import { Currency } from "../entities/currency.enum"
import { IsEnum } from 'class-validator';
import { IsOrderNumberUnique, IsOrderNumberUniqueConstraint } from "../order-number.validator";

export class CreateOrderDto {

    @IsOrderNumberUnique({ message: 'Order with such Number already exists'})
    orderNumber: string

    paymentDescription: string

    streetAddress: string

    town: string

    country: string

    amount: number

    @IsEnum(Currency)
    currency: Currency

    paymentDueDate: Date

}