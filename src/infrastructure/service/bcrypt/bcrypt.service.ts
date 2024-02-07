import { Injectable } from '@nestjs/common';
import { IBCryptService } from '../../../domain/adapters/bcrypt.interface';

@Injectable()
export class BcryptService implements IBCryptService {
  async hash(password: string): Promise<string> {
    return Bun.password.hash(password, 'bcrypt');
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return Bun.password.verify(password, hash);
  }
}
