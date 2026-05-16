import {
    IsInt,
    IsNumber,
    IsPositive,
    IsString,
    Min,
} from 'class-validator';

export class CreateProductDto {
    @IsString()
    nome!: string;

    @IsString()
    skuCode!: string;

    @IsString()
    categoriaId!: string;

    @IsNumber()
    @IsPositive()
    precoCusto!: number;

    @IsNumber()
    @IsPositive()
    precoVenda!: number;

    @IsInt()
    @Min(0)
    estoqueAtual!: number;

    @IsInt()
    @Min(0)
    estoqueMinimo!: number;
  }