import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/product (GET)', () => {
    return request(app.getHttpServer())
      .get('/product?limit=20&page=1')
      .expect(200)
      .expect((res: request.Response) => {
        //como body no es un array debo comentar esta linea 
        //expect(Array.isArray(res.body)).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(typeof res.body.total).toBe('number');
      });
  });

  it('/product (POST)', () => {
    return request(app.getHttpServer())
      .post('/product')
      .send({ name: 'Camisa', sku: '123', stock: 10 })
      .expect(201)
      .expect((res: request.Response) => {
        expect(res.body).toHaveProperty('id');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
