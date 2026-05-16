import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-categoria.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }