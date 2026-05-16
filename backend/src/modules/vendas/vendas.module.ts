import { Module } from '@nestjs/common';
import { SalesController } from './vendas.controller';
import { SalesService } from './vendas.service';



@Module({
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule { }