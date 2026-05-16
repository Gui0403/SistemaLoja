import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-cliente.dto';
import { UpdateCustomerDto } from './dto/update-cliente.dto';


@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateCustomerDto) {
    if (dto.cpfCnpj) {
      const exists = await this.prisma.cliente.findUnique({
        where: { cpfCnpj: dto.cpfCnpj },
      });

      if (exists) {
        throw new ConflictException('Cliente já existe');
      }
    }

    return await this.prisma.cliente.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.cliente.findMany({
      include: {
        vendas: true,
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const customer = await this.prisma.cliente.findUnique({
      where: { id },
      include: {
        vendas: true,
      },
    });

    if (!customer) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return customer;
  }

  async update(id: string, dto: UpdateCustomerDto) {
    await this.findOne(id);

    return await this.prisma.cliente.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.prisma.cliente.delete({
      where: { id },
    });
  }
}