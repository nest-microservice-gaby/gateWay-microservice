import { BadRequestException, Body, Controller, Delete, Get, Inject, Logger, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, pipe } from 'rxjs';
import { PaginationDto, } from 'src/common';
import { CreateProductDto } from './product/create-product.dto';
import { UpdateProductDto } from './product/update-product.dto';
import { PRODUCT_SERVICE } from '../config';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create-product' }, createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find-all-products' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'find-one-product' }, { id })
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
    return this.productsClient.send({cmd:'update-product'},{id,  ...updateProductDto})
    .pipe(
      catchError(error => {
        throw new RpcException(error);
      })
    ) 
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsClient.send({cmd:'remove-product'}, {id})
    .pipe(
      catchError(error => { 
        throw new RpcException(error);
      }
      )
    ) 
  }

}
