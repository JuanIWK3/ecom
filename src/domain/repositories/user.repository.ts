import { User } from '@prisma/client';

export interface UserRepository {
  getUserByUsername(username: string): Promise<User>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
}
