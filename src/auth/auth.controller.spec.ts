import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

const userMock = {
  email: 'controller@email.com',
  hash: 'password',
};

describe('ProductController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sign up a user', async () => {
    const result = await controller.signup(userMock);

    expect(result.accessToken).toBeDefined();
  });

  it('should sign in a user', async () => {
    const result = await controller.signin(userMock);

    expect(result.accessToken).toBeDefined();
  });

  it('should refresh a token', async () => {
    const result = await controller.refreshTokens();

    expect(result).toBeUndefined();
  });

  it('should log out a user', async () => {
    const output = await controller.signup({
      email: 'c2@email.com',
      hash: 'password',
    });

    const result = await controller.logout({
      user: {
        sub: output.user.id,
      },
    });

    expect(result).toBeUndefined();
  });
});
