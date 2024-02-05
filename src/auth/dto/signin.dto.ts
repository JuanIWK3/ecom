import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { SignUpDTO } from './signup.dto';

export class SignInDto extends PartialType(SignUpDTO) {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  hash: string;
}
