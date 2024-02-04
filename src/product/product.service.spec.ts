import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from 'src/infra/db/prisma-service';

describe('ProductService', () => {
  let service: ProductService;
  let numberOfProducts: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await service.findAll();
    expect(products).toBeInstanceOf(Array);
    numberOfProducts = products.length;
  });

  it('should create a product', async () => {
    const newProduct = await service.create({
      name: 'New Product',
    });

    expect(newProduct).toHaveProperty('id');
  });

  it('should return one product', async () => {
    const products = await service.findAll();
    const product = await service.findOne(products[0].id);
    expect(product).toHaveProperty('id');
  });

  it('should update a product', async () => {
    const products = await service.findAll();
    const updatedProduct = await service.update(products[0].id, {
      name: 'Updated Product',
    });
    expect(updatedProduct).toHaveProperty('id');
  });

  it('should delete a product', async () => {
    const products = await service.findAll();
    const deletedProduct = await service.remove(products[0].id);
    expect(deletedProduct).toHaveProperty('id');
  });
});
