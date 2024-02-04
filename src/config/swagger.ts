import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecom')
    .setDescription('Ecom API description')
    .setVersion('1.0')
    .addTag('ecom')
    .build();

