import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import humanId from 'human-id';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly entityManager: EntityManager) {
  }

  async create(createOrderDto: CreateOrderDto) {
    const readableIdGenerationOptions = {
      adjectiveCount: 1,
      addAdverb: true,
      separator: '-'
    }
    const orderNumber = humanId(readableIdGenerationOptions);
    const entityToSave = new Order({
      'orderNumber': orderNumber,
      'paymentDescription': createOrderDto.paymentDescription,
      'country': createOrderDto.country,
      'streetAddress': createOrderDto.streetAddress,
      'town': createOrderDto.town,
      'amount': createOrderDto.amount,
      'currency': createOrderDto.currency,
      'paymentDueDate': createOrderDto.paymentDueDate
    })
    await this.entityManager.save(entityToSave)
  }

  async findAll() {
    return this.ordersRepository.find()
  }

  async findOne(id: number) {
    return this.ordersRepository.findOneBy({ id })
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const orderToUpdate = this.ordersRepository.findOneBy({ id })
    await this.entityManager.save({ ...orderToUpdate, ...updateOrderDto })
  }

  async remove(id: number) {
    await this.ordersRepository.delete({ id })
  }
}
