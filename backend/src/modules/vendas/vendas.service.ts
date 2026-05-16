import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { randomUUID } from 'crypto';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleDto } from './dto/create-venda.dto';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateSaleDto) {
    return await this.prisma.$transaction(async (tx) => {
      let subtotal = 0;

      const itemsProcessados: Array<{
        produtoId: string;
        quantidade: number;
        precoUnitario: number;
        custoUnitario: number;
      }> = [];

      // =========================
      // 1. VALIDAR ITENS
      // =========================
      for (const item of dto.items) {
        const produto = await tx.produto.findUnique({
          where: { id: item.produtoId },
        });

        if (!produto) {
          throw new NotFoundException(
            `Produto ${item.produtoId} não encontrado`,
          );
        }

        if (produto.estoqueAtual < item.quantidade) {
          throw new BadRequestException(
            `Estoque insuficiente para ${produto.nome}`,
          );
        }

        const precoUnitario = Number(produto.precoVenda);
        const custoUnitario = Number(produto.precoCusto);

        subtotal += precoUnitario * item.quantidade;

        itemsProcessados.push({
          produtoId: produto.id,
          quantidade: item.quantidade,
          precoUnitario,
          custoUnitario,
        });
      }

      const total = subtotal;

      // =========================
      // 2. CRIAR VENDA
      // =========================
      const venda = await tx.venda.create({
        data: {
          numeroVenda: `VENDA-${randomUUID()}`,

          clienteId: dto.clienteId,
          usuarioId: dto.usuarioId,

          subtotal,
          total,

          formaPagamento: dto.formaPagamento,
          observacoes: dto.observacoes,

          itens: {
            create: itemsProcessados,
          },
        },

        include: {
          itens: true,
        },
      });

      // =========================
      // 3. CRIAR FATURA
      // =========================
      await tx.fatura.create({
        data: {
          vendaId: venda.id,
          numeroFatura: `FAT-${randomUUID()}`,
          statusFatura: 'EMITIDA',
        },
      });

      // =========================
      // 4. ATUALIZAR ESTOQUE
      // =========================
      await Promise.all(
        itemsProcessados.map((item) =>
          tx.produto.update({
            where: { id: item.produtoId },
            data: {
              estoqueAtual: {
                decrement: item.quantidade,
              },
              itensVendidos: {
                increment: item.quantidade,
              },
            },
          }),
        ),
      );

      return venda;
    });
  }

  // =========================
  // LISTAR VENDAS
  // =========================
  async findAll() {
    return await this.prisma.venda.findMany({
      include: {
        cliente: true,
        usuario: true,
        itens: {
          include: {
            produto: true,
          },
        },
        fatura: true,
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });
  }

  // =========================
  // BUSCAR UMA VENDA
  // =========================
  async findOne(id: string) {
    const sale = await this.prisma.venda.findUnique({
      where: { id },
      include: {
        cliente: true,
        usuario: true,
        itens: {
          include: {
            produto: true,
          },
        },
        fatura: true,
      },
    });

    if (!sale) {
      throw new NotFoundException('Venda não encontrada');
    }

    return sale;
  }
}