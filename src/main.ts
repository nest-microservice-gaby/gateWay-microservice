import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
const logger = new Logger('main-Gateway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );

   app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(envs.port);

  console.log('Hola mundo, segundo cambio!!!!');
  
  logger.log(`Gatewy on port #:${envs.port}`);
}
bootstrap();
