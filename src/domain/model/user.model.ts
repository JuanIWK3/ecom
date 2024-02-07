import { User } from '@prisma/client';

export interface UserModel extends User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  address: string;
  number_address: string;
  phone: string;
}

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
