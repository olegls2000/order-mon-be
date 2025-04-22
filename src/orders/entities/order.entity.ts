import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    currency: string

    @Column()
    paymentDueDate: Date

    @Column()
    country: String;

    constructor(order: Partial<Order>) {
        Object.assign(this, order)
    }

}
