import { Test } from '@nestjs/testing';
import { INestApplication, ExecutionContext, CanActivate, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { AdminController } from '../src/admin/admin.controller';
import { RolesGuard } from '../src/roles/roles.guard';

const TEST_SECRET = 'test-secret';

// Mock RolesGuard to handle both auth and role check for test
class MockRolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'];
    if (!auth || !auth.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }
    const token = auth.split(' ')[1];
    try {
      const payload = jwt.verify(token, TEST_SECRET);
      req.user = payload;
      const roles = payload['https://focusbear.com/roles'] || [];
      if (roles.includes('admin')) {
        return true;
      }
      throw new ForbiddenException();
    } catch {
      throw new UnauthorizedException();
    }
  }
}

describe('AdminController (e2e, JWT mock)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AdminController],
    })
      .overrideGuard(RolesGuard)
      .useClass(MockRolesGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should allow access with a valid admin JWT', async () => {
    const token = jwt.sign(
      { sub: 1, 'https://focusbear.com/roles': ['admin'] },
      TEST_SECRET,
      { expiresIn: '1h' }
    );

    const res = await request(app.getHttpServer())
      .get('/admin')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toEqual({ message: 'Welcome, Admin! You have access.' });
  });

  it('should reject requests without a token', async () => {
    await request(app.getHttpServer())
      .get('/admin')
      .expect(401);
  });

  it('should reject requests with an invalid token', async () => {
    const badToken = jwt.sign(
      { sub: 2, 'https://focusbear.com/roles': ['admin'] },
      'wrong-secret'
    );
    await request(app.getHttpServer())
      .get('/admin')
      .set('Authorization', `Bearer ${badToken}`)
      .expect(401);
  });

  it('should reject requests with a non-admin JWT', async () => {
    const token = jwt.sign(
      { sub: 3, 'https://focusbear.com/roles': ['user'] },
      TEST_SECRET,
      { expiresIn: '1h' }
    );
    await request(app.getHttpServer())
      .get('/admin')
      .set('Authorization', `Bearer ${token}`)
      .expect(401);
  });
});