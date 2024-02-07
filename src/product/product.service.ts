import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/infrastructure/config/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(page: number, perPage: number) {
    return await this.prisma.product.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }

  async findOne(id: string) {
    return await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.prisma.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
