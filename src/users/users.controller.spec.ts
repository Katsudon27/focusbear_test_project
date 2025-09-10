import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUsersService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Alice', email: 'alice@gmail.com' }])
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{provide: UsersService, useValue: mockUsersService}]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should return all users', async () => {
    await expect(controller.findAll()).resolves.toEqual([{ id: 1, name: 'Alice',  email: 'alice@gmail.com' }]);
    expect(mockUsersService.findAll).toHaveBeenCalled();
  });
});
