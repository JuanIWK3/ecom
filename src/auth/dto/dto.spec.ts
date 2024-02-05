import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { SignUpDTO } from './signup.dto';
import { SignInDto } from './signin.dto';

const validEmail = 'user@email.com';
const validPassword = 'password';
const invalidEmail = 'useremail.com';
const invalidPassword = '7digits';

describe('SignUp DTO', () => {
  it('should not signup a user with an invalid email ', async () => {
    const newUser: SignUpDTO = {
      email: invalidEmail,
      hash: validPassword,
    };

    const dto = plainToInstance(SignUpDTO, newUser);

    const errors = await validate(dto);

    expect(errors.length).not.toBe(0);
  });

  it('should not signup a user with an invalid password', async () => {
    const newUser: SignUpDTO = {
      email: validEmail,
      hash: invalidPassword,
    };

    const dto = plainToInstance(SignUpDTO, newUser);

    const errors = await validate(dto);

    expect(errors.length).not.toBe(0);
  });
});

describe('SignIn DTO', () => {
  it('should not signin a user with an invalid email ', async () => {
    const user: SignInDto = {
      email: invalidEmail,
      hash: validPassword,
    };

    const dto = plainToInstance(SignInDto, user);

    const errors = await validate(dto);

    expect(errors.length).not.toBe(0);
  });

  it('should not signin a user with an invalid password', async () => {
    const user: SignInDto = {
      email: validEmail,
      hash: invalidPassword,
    };

    const dto = plainToInstance(SignInDto, user);

    const errors = await validate(dto);

    expect(errors.length).not.toBe(0);
  });
});
