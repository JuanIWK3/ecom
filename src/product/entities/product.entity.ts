import { IsString, MinLength } from 'class-validator';

export class Product {
  @IsString()
  id: string;

  @IsString()
  @MinLength(3)
  name: string;
}
