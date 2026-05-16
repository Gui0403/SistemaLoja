import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-categoria.dto';
import { UpdateCategoryDto } from './dto/update-categoria.dto';



@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateCategoryDto) {
    const categoryAlreadyExists =
      await this.prisma.categoria.findUnique({
        where: {
          nome: dto.nome,
        },
      });

    if (categoryAlreadyExists) {
      throw new ConflictException(
        'Categoria já existe',
      );
    }

    return await this.prisma.categoria.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.categoria.findMany({
      include: {
        produtos: true,
      },

      orderBy: {
        criadoEm: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const category =
      await this.prisma.categoria.findUnique({
        where: {
          id,
        },

        include: {
          produtos: true,
        },
      });

    if (!category) {
      throw new NotFoundException(
        'Categoria não encontrada',
      );
    }

    return category;
  }

  async update(
    id: string,
    dto: UpdateCategoryDto,
  ) {
    await this.findOne(id);

    return await this.prisma.categoria.update({
      where: {
        id,
      },

      data: dto,
    });
  }

  async remove(id: string) {
    const productsCount =
      await this.prisma.produto.count({
        where: {
          categoriaId: id,
        },
      });

    if (productsCount > 0) {
      throw new ConflictException(
        'Categoria possui produtos vinculados',
      );
    }

    return await this.prisma.categoria.delete({
      where: {
        id,
      },
    });
  }
}