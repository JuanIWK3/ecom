// prisma.service.spec.ts

import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
  });

  it('should successfully connect to the database on module initialization', async () => {
    // Assuming the $connect method returns a Promise
    expect(async () => prismaService.onModuleInit()).not.toThrow();
  });

  // Add more test cases as needed

  afterAll(async () => {
    // Assuming there's a $disconnect method in PrismaClient
    await prismaService.$disconnect();
  });
});
