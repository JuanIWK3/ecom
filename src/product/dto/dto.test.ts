import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { validate } from 'class-validator';

describe('Create Product DTO', () => {
  it('should not create with a name smaller than 3 chars', async () => {
    const createProduct = {
      name: 'Pr',
    };

    const dto = plainToInstance(CreateProductDto, createProduct);

    const errors = await validate(dto);

    expect(errors.length).not.toBe(0);
  });
});

describe('Update Product DTO', () => {
  it('should not update with a name smaller than 3 chars', async () => {
    const updateProduct = {
      name: 'Pr',
    };

    const dto = plainToInstance(UpdateProductDto, updateProduct);

    const errors = await validate(dto);

    expect(errors.length).not.toBe(0);
  });
});
