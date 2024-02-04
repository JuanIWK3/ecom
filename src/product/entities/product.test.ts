import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Product } from './product.entity';

describe('Create Product DTO', () => {
  it('should not create with a name smaller than 3 chars', async () => {
    const createProduct = {
      id: "123123123",
      name: 'Pr',
    };

    const dto = plainToInstance(Product, createProduct);

    const errors = await validate(dto);

    expect(errors.length).not.toBe(0);
  });
});
