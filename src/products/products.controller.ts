import { BadRequestException, Body, Controller, Delete, Get, Inject, Logger, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, pipe } from 'rxjs';
import { PaginationDto, } from 'src/common';
import { CreateProductDto } from './product/create-product.dto';
import { UpdateProductDto } from './product/update-product.dto';
import { NATS_SERVICE } from '../config';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create-product' }, createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find-all-products' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'find-one-product' }, { id })
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      )
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    Logger.log('updateProductDto', JSON.stringify(updateProductDto));
    Logger.log('id', JSON.stringify(id));
    return this.client.send({cmd:'update-product'},{id,  ...updateProductDto})
    .pipe(
      catchError(error => {
        throw new RpcException(error);
      })
    ) 
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send({cmd:'remove-product'}, {id})
    .pipe(
      catchError(error => { 
        throw new RpcException(error);
      }
      )
    ) 
  }

}
