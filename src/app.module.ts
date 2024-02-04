import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { PrismaService } from './infra/db/prisma.service';

@Module({
  imports: [ProductModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
