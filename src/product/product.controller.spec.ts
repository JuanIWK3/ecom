import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../infra/db/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, PrismaService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of products', async () => {
    expect(await controller.findAll()).toBeInstanceOf(Array);
  });

  it('should return a product', async () => {
    const products = await controller.findAll();
    const product = products[0];

    expect(await controller.findOne(product.id)).toBeInstanceOf(Object);
  });

  it('should create a product', async () => {
    const product: CreateProductDto = {
      name: 'Product Test',
    };

    expect(await controller.create(product)).toBeInstanceOf(Object);
  });

  it('should update a product', async () => {
    const products = await controller.findAll();
    const product = products[0];

    expect(
      await controller.update(product.id, { name: 'Product Test' }),
    ).toBeInstanceOf(Object);
  });

  it('should delete a product', async () => {
    const products = await controller.findAll();
    const product = products[0];

    expect(await controller.remove(product.id)).toBeInstanceOf(Object);
  });
});
