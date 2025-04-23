import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsOrderNumberUniqueConstraint implements ValidatorConstraintInterface {
    constructor(
      @InjectRepository(Order)
      private readonly ordersRepository: Repository<Order>) {
    }

  async validate(orderNumber: string): Promise<boolean> {
    const duplicateOrder =  await this.ordersRepository.find({
        where: {
          orderNumber
        }
      })
    
      return !duplicateOrder;
  }
}

export function IsOrderNumberUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsOrderNumberUniqueConstraint,
      });
    }
}