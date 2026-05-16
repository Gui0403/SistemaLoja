import { PrismaService } from "@/prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

  private calcularLucro(produto: any) {
    return Number(produto.precoVenda) - Number(produto.precoCusto);
  }

  async create(dto: CreateProductDto) {
    return await this.prisma.produto.create({
      data: {
        nome: dto.nome,
        skuCode: dto.skuCode,
        categoriaId: dto.categoriaId,

        precoCusto: dto.precoCusto,
        precoVenda: dto.precoVenda,

        estoqueAtual: dto.estoqueAtual,
        estoqueMinimo: dto.estoqueMinimo,
      },
    });
  }

  async findAll() {
    const produtos = await this.prisma.produto.findMany();

    return produtos.map((produto) => ({
      ...produto,

      lucro: this.calcularLucro(produto)
    }));
  }

  async findOne(id: string) {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return {
      ...produto,

      lucro: this.calcularLucro(produto)
    };
  }

  async update(id: string, dto: UpdateProductDto) {
    return await this.prisma.produto.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.produto.delete({
      where: {
        id,
      },
    });
  }
}