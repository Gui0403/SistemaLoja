import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateInvoiceDto } from './dto/update-fatura.dto';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return this.prisma.fatura.findMany({
      include: {
        venda: {
          include: {
            cliente: true,
            itens: {
              include: {
                produto: true,
              },
            },
          },
        },
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const invoice = await this.prisma.fatura.findUnique({
      where: { id },
      include: {
        venda: {
          include: {
            cliente: true,
            itens: {
              include: {
                produto: true,
              },
            },
          },
        },
      },
    });

    if (!invoice) {
      throw new NotFoundException('Fatura não encontrada');
    }

    return invoice;
  }

  async update(id: string, dto: UpdateInvoiceDto) {
    await this.findOne(id);

    return this.prisma.fatura.update({
      where: { id },
      data: dto,
    });
  }

  async markAsPaid(id: string) {
    const invoice = await this.findOne(id);

    return this.prisma.fatura.update({
      where: { id },
      data: {
        statusFatura: 'PAGA',
        dataPagamento: new Date(),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.fatura.delete({
      where: { id },
    });
  }
}