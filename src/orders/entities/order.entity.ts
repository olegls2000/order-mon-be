import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Currency } from "./currency.enum";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    orderNumber: string

    @Column()
    paymentDescription: string

    @Column()
    streetAddress: string

    @Column()
    town: string

    @Column()
    amount: number

    @Column({
        type: 'enum',
        enum: Currency
      })
      currency: Currency;

    @Column()
    paymentDueDate: Date

    @Column()
    country: String;

    constructor(order: Partial<Order>) {
        Object.assign(this, order)
    }

}
