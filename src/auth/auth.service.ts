import { Injectable } from '@nestjs/common';
import { SignUpDTO } from '../infrastructure/controller/signup.dto';
import { SignInDto } from '../infrastructure/controller/signin.dto';
import { PrismaService } from '../infrastructure/config/prisma.service';
import { Tokens } from '../domain/model/user.model';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getTokens(userId: string, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: '15m', secret: process.env.ACCESS_SECRET },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: '7d', secret: process.env.REFRESH_SECRET },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async signup(dto: SignUpDTO) {
    const emailExists = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (emailExists) {
      throw new Error('Email already exists');
    }

    const hashed = await Bun.password.hash(dto.password);

    const createdUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
      },
    });

    const tokens = await this.getTokens(createdUser.id, createdUser.email);

    await this.updateRefreshToken(createdUser.id, tokens.refreshToken);

    return {
      user: createdUser,
      accessToken: '',
      refreshToken: '',
    };
  }

  async signin(dto: SignInDto): Promise<Tokens> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const match = await Bun.password.verify(dto.password, user.password);

    if (!match) {
      throw new Error('Invalid credentials');
    }

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: null,
      },
    });
  }

  async refreshTokens() {}

  async deleteAllAccounts() {
    await this.prisma.user.deleteMany({});

    return await this.prisma.user.findMany();
  }

  async updateRefreshToken(userId: string, rt: string) {
    const rtHashed = await Bun.password.hash(rt);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: rtHashed,
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async deleteUser(id: string): Promise<User> {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
