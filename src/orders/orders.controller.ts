import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { QueryDto } from './dto/query.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll() {

    return this.ordersService.findAll();
  } 
  
  @Get()
  async findByOrderNumber(@Query('orderNumber') orderNumber: string) {

    return this.ordersService.findByOrderNumber(orderNumber)
  }

  @Get()
  async findByQueryParams(@Query() query: QueryDto) {
    
    return this.ordersService.findByQuery;
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.ordersService.findOneById(+id);
  }
}
