import {
    IsEmail,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    @MinLength(2)
    nome!: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    telefone?: string;

    @IsOptional()
    @IsString()
    cpfCnpj?: string;

    @IsOptional()
    @IsString()
    endereco?: string;
  }