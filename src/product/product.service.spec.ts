import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infrastructure/config/prisma.service';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const product = await service.create({
      name: 'Product ' + Math.floor(Math.random() * 100),
      description: 'Description ' + Math.floor(Math.random() * 100),
      price: Math.floor(Math.random() * 100),
      image: 'https://picsum.photos/200/300',
    });

    expect(product).toHaveProperty('id');
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });
});
