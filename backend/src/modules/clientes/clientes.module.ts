import { Module } from '@nestjs/common';
import { CustomersController } from './clientes.controller';
import { CustomersService } from './clientes.service';



@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule { }