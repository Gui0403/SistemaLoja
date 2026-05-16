import {
    IsArray,
    IsEnum,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { FormaPagamentoEnum } from '@prisma/client';

import { CreateSaleItemDto } from './create-sale-item.dto';

export class CreateSaleDto {
    @IsString()
    clienteId!: string;

    @IsOptional()
    @IsString()
    usuarioId?: string;

    @IsOptional()
    @IsEnum(FormaPagamentoEnum)
    formaPagamento?: FormaPagamentoEnum;

    @IsOptional()
    observacoes?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSaleItemDto)
    items!: CreateSaleItemDto[];
  }