import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { SalesService } from './vendas.service';
import { CreateSaleDto } from './dto/create-venda.dto';



@Controller('sales')
export class SalesController {
  constructor(
    private readonly salesService: SalesService,
  ) { }

  @Post()
  create(@Body() dto: CreateSaleDto) {
    return this.salesService.create(dto);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }
}