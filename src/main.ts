import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup(
    '/api',
    app,
    SwaggerModule.createDocument(app, swaggerConfig, {}),
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4000);

  console.log(`Server running on ${await app.getUrl()}`);
}

bootstrap();
