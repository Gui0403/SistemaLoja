import {
    IsInt,
    IsPositive,
    IsString,
    Min,
} from 'class-validator';

export class CreateSaleItemDto {
    @IsString()
    produtoId!: string;

    @IsInt()
    @Min(1)
    quantidade!: number;
  }