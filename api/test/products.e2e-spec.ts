import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';



describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let data: any = []

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/product (GET) all products - 200', () => {
    return request(app.getHttpServer())
      .get('/product?limit=20&page=1')
      .expect(200)
      .expect((res: request.Response) => {
        data = res.body.data
        //como body no es un array debo comentar esta linea 
        //expect(Array.isArray(res.body)).toBe(true);        
        expect(Array.isArray(res.body.data)).toBe(true);        
        expect(typeof res.body.total).toBe('number');
        
      });
  });  

  it('/product (POST) new product - 200', () => {
    return request(app.getHttpServer())
      .post('/product')
      .send({ name: 'Camisa', sku: '123', stock: 10 })
      .expect(201)
      .expect((res: request.Response) => {
        expect(res.body).toHaveProperty('id');
      });
  });

  it('/product (PATCH) edit product - 200', () => {
    return request(app.getHttpServer())
      .patch(`/product/${data[0].id}`)
      .send({ name: 'Deste Test se edita nombre', sku: 'ElSkuTest' })
      .expect(200)
      .expect((res: request.Response) => {
        expect(res.body).toHaveProperty('id');
      });
  });  

  it('/product (PATCH) edit stock fail - 404', () => {
    return request(app.getHttpServer())
      .patch(`/product/abdc?typeMovement=IN`)
      .send({ stock: 10 })
      .expect(404)
      .expect((res: request.Response) => {
        expect(res.body).toHaveProperty('statusCode', 404);
        expect(res.body).toHaveProperty('message');
      });
  });

  it('/product (PATCH) stock not available  STOCK OUT - 400', () => {
    return request(app.getHttpServer())
      .patch(`/product/${data[0].id}?typeMovement=OUT`)
      .send({ stock: 10000 })
      .expect(400)
      .expect((res: request.Response) => {
        expect(res.body).toHaveProperty('statusCode', 400);
        expect(res.body).toHaveProperty('message');
      });
  });

  it('/product (PATCH) edit stock success STOCK IN - 200', () => {
    return request(app.getHttpServer())
      .patch(`/product/${data[0].id}?typeMovement=IN`)
      .send({ stock: 8 })
      .expect(200)
      .expect((res: request.Response) => {
        expect(res.body).toHaveProperty('id');
      });
  });

  it('/product (PATCH) edit stock success  STOCK OUT - 200', () => {
    return request(app.getHttpServer())
      .patch(`/product/${data[0].id}?typeMovement=OUT`)
      .send({ stock: 1 })
      .expect(200)
      .expect((res: request.Response) => {
        expect(res.body).toHaveProperty('id');
      });
  });

  it('/stock-movement (GET) all movements stock - 200', () => {
    return request(app.getHttpServer())
      .get('/stock-movement?limit=20&page=1')
      .expect(200)
      .expect((res: request.Response) => {        
        //como body no es un array debo comentar esta linea 
        //expect(Array.isArray(res.body)).toBe(true);        
        expect(Array.isArray(res.body.data)).toBe(true);        
        expect(typeof res.body.total).toBe('number');
        
      });
  }); 

  afterAll(async () => {
    await app.close();
  });
});
