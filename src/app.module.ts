import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/config/prisma.module';
import { PrismaService } from './infrastructure/config/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { JwtModule } from './infrastructure/service/jwt/jwt.module';
import { BcryptModule } from './infrastructure/service/bcrypt/bcrypt.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    ProductModule,
    JwtModule,
    BcryptModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
