import { Controller, Get, Post, Body, Param, Inject, Query, Patch, ParseUUIDPipe } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { UUID } from 'crypto';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return firstValueFrom(
        this.client.send('createOrder', createOrderDto)
      );
    }
    catch (error) {
      throw new RpcException(error);
    }
  }
  
  @Get()
  async findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    try{
      const orders = await firstValueFrom(
        this.client.send('findAllOrders', orderPaginationDto)
      );
      return orders;
    
  } catch (error) {
    throw new RpcException(error);
  }
}

  @Get(':id')
  async findOne(@Param('id') id: UUID) {
    try {
      const order = await firstValueFrom(
        this.client.send('findOneOrder', id)
      )
      return order;
    }
    catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('status/:status')
  async findOrderByStatus(
    @Param('status') statusDto: StatusDto,
    @Query() paginationDto: PaginationDto) {

    try {
      const response = await firstValueFrom(
        this.client.send('findAllOrders', { ...paginationDto, status: statusDto.status }),
      );
      if (!response) {
        throw new RpcException('No orders found for the given status.');
      }
      return response;
    } catch (error) {
      console.error('Error fetching orders by status:', error);
      throw new RpcException(error.message || 'Internal server error');
    }
  }


  @Patch(':id')
  async changeStatus(
    @Param('id', ParseUUIDPipe ) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.client.send('changeOrderStatus', { id, status: statusDto.status }),
      );
  
      if (!response) {
        throw new RpcException('No response from the microservice.');
      }
  
      return response;
      
    } catch (error) {
      console.error('Error in changeStatus:', error);
      throw new RpcException(error.message || 'Internal server error');
    }
  }
}