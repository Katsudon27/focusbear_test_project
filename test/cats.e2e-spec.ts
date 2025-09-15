import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe} from '@nestjs/common';
import {CatsModule} from '../src/cats/cats.module';

describe('Cats API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [CatsModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('GET /cats', () => {
    it('should return all cats (200)', async () => {
      const res = await request(app.getHttpServer()).get('/cats').expect(200);
      expect(res.body[0]).toHaveProperty('name');
    });
  });

  describe('POST /cats', () => {
    it('should create a cat (201)', async () => {
      const payload = { name: 'Bob'};
      const res = await request(app.getHttpServer())
        .post('/cats')
        .send(payload)
        .expect(201);
    });

    it('should fail with invalid data (400)', async () => {
      await request(app.getHttpServer())
        .post('/cats')
        .send({ foo: 'bar' })
        .expect(400);
    });
  });

    afterAll(async () => {
    await app.close();
  });
});