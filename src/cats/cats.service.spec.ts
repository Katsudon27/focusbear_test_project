import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cats', () => {
    expect(service.findAll()).toEqual([{ id: 1, name: 'Alice' }]);
  });

  it('should return a single cat by id', () => {
    expect(service.findOne(1)).toEqual({ id: 1, name: 'Alice' });
  });

  it('should return undefined if cat not found', () => {
    expect(service.findOne(99)).toBeUndefined();
  });
});
