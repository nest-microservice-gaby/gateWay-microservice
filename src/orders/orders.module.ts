import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_SERVICE } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMicroserviceHost,
          port: envs.ordersMicroservicePort,
        }
      }
    ])
  ],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
