import { ConflictException, Inject, Injectable, Req } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CategoryService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryWithNameAlreadyExist = await this.prisma.category.findFirst({
      where: { name: createCategoryDto.name },
    });

    if (categoryWithNameAlreadyExist) {
      throw new ConflictException('Já existe uma categoria com esse nome.');
    }

    return this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        description: createCategoryDto.description,
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id: id },
      data: {
        name: updateCategoryDto.name,
        description: updateCategoryDto.description,
      },
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
