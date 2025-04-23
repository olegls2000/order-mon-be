import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import humanId from 'human-id';
import { QueryDto } from './dto/query.dto';

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
    await this.ordersRepository.find()
  }

  async findOneById(id: number) {
    const order = await this.ordersRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async findByOrderNumber(orderNumber: string) {
    await this.ordersRepository.find({
      where: {
        orderNumber
      }
    })
  }

  async findByQuery(query: QueryDto) {
    const countryCode = query.countryCode;
    const description = query.description;
    await this.ordersRepository
      .createQueryBuilder('order')
      .where('WHERE payment_description LIKE \'%\' || :description || \'%\' AND country = :countryCode',
        {
          description,
          countryCode
        })
      .getMany();
  }
}
