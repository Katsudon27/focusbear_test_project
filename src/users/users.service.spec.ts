import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;

  // create a fake/mock repository
  const mockUserRepository = {
    find: jest.fn().mockResolvedValue([{ id: 1, name: 'Alice', email: 'alice@gmail.com' }]),
    save: jest.fn(),
    findOneBy: jest.fn().mockImplementation((criteria) =>
      Promise.resolve({ id: criteria.id, name: 'Mock User', email: 'mock@gmail.com' })),
    update: jest.fn(),
    delete: jest.fn(),
    // add other methods your service calls
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository }, // 👈 provide the mock
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return all users', async () => {
    expect(await service.findAll()).toEqual([{ id: 1, name: 'Alice', email: 'alice@gmail.com' }]);
    expect(mockUserRepository.find).toHaveBeenCalled();
  });

  it('should return a user by id', async () => {
    expect(await service.findOne(99)).toEqual({ id: 99, name: 'Mock User', email: 'mock@gmail.com' });
    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: 99 });
  });
});
