import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDto } from './create-venda.dto';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {}
