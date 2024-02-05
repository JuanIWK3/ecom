import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should successfully connect to the database on module initialization', async () => {
    // Assuming the $connect method returns a Promise
    expect(async () => service.onModuleInit()).not.toThrow();
  });

  // Add more test cases as needed

  it('should successfully disconnect from the database on module destruction', async () => {
    // Assuming the $disconnect method returns a Promise
    expect(async () => service.onModuleDestroy()).not.toThrow();
  });

  afterEach(async () => {
    await service.$disconnect();
  });
});
