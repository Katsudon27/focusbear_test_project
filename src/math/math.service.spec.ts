import { MathService } from './math.service';

describe('MathService (good)', () => {
  let service: MathService;

  beforeEach(() => {
    service = new MathService();
  });

  it('should add two numbers', () => {
    expect(service.add(2, 3)).toBe(5);
  });

  it('should divide numbers', () => {
    expect(service.divide(10, 2)).toBe(5);
  });

  it('should throw on divide by zero', () => {
    expect(() => service.divide(5, 0)).toThrow('Division by zero');
  });
});
