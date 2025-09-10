import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// 👇 Mock the whole UsersService class
jest.mock('./cats.service');

describe('CatsController with jest.mock', () => {
  let controller: CatsController;
  let service: jest.Mocked<CatsService>;

  beforeEach(() => {
    service = new CatsService() as jest.Mocked<CatsService>;
    controller = new CatsController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', () => {
    // define the mock return value
    service.findAll.mockReturnValue([{ id: 99, name: 'Mock User' }]);

    expect(controller.getCats()).toEqual([{ id: 99, name: 'Mock User' }]);
    expect(service.findAll).toHaveBeenCalled();
  });
});
