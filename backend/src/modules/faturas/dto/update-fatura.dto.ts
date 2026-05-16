import { IsEnum, IsOptional } from 'class-validator';
import { StatusFaturaEnum } from '@prisma/client';

export class UpdateInvoiceDto {
    @IsOptional()
    @IsEnum(StatusFaturaEnum)
    statusFatura?: StatusFaturaEnum;
}