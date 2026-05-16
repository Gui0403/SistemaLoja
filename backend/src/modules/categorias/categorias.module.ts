import { Module } from '@nestjs/common';
import { CategoriesController } from './categorias.controller';
import { CategoriesService } from './categorias.service';



@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule { }