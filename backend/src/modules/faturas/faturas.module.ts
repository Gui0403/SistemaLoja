import { Module } from '@nestjs/common';
import { InvoicesController } from './faturas.controller';
import { InvoicesService } from './faturas.service';



@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule { }