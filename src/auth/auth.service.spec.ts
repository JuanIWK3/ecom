import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

const userMock = {
  email: 'user@email.com',
  password: 'password',
};

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  beforeEach(async () => {
    await service.deleteAllAccounts();
  });

  afterAll(async () => {
    await service.deleteAllAccounts();
  });

  it('should signup a new user', async () => {
    const signupOutput = await service.signup(userMock);
    expect(signupOutput.user.email).toBe(userMock.email);
    expect(signupOutput.accessToken).toBeDefined();
    expect(signupOutput.refreshToken).toBeDefined();
  });

  it('should not signup a user with an existing email', async () => {
    await service.signup(userMock);
    await expect(service.signup(userMock)).rejects.toThrow(
      'Email already exists',
    );
  });

  it('should login a user', async () => {
    await service.signup(userMock);
    const loginOutput = await service.signin(userMock);
    expect(loginOutput.accessToken).toBeDefined();
    expect(loginOutput.refreshToken).toBeDefined();
  });

  it('should not login a user with incorrect password', async () => {
    await service.signup(userMock);
    await expect(
      service.signin({ email: userMock.email, hash: 'wrongPassword' }),
    ).rejects.toThrow('Invalid credentials');
  });

  it('should not signin a user that does not exist', async () => {
    await expect(
      service.signin({ email: 'nonexistentuser', hash: 'password' }),
    ).rejects.toThrow('User not found');
  });

  it('should logout a user', async () => {
    const user = await service.signup(userMock);

    await service.logout(user.user.id);

    const userAfterLogout = await service.getUserById(user.user.id);

    expect(userAfterLogout.refreshToken).toBeNull();
  });

  it('should not logout a user that does not exist', async () => {
    await expect(service.logout('nonexistentuser')).rejects.toThrow(
      'User not found',
    );
  });

  it('should delete a user', async () => {
    const user = await service.signup(userMock);

    await service.deleteUser(user.user.id);

    await expect(service.getUserById(user.user.id)).rejects.toThrow(
      'User not found',
    );
  });

  it('should get all users', async () => {
    await service.signup(userMock);

    const users = await service.getAllUsers();

    expect(users.length).toBe(1);
  });

  it('should get a user by id', async () => {
    const user = await service.signup(userMock);

    const userById = await service.getUserById(user.user.id);

    expect(userById.email).toBe(userMock.email);
  });

  it('should get a user by email', async () => {
    await service.signup(userMock);

    const userByEmail = await service.getUserByEmail(userMock.email);

    expect(userByEmail.email).toBe(userMock.email);
  });
});
