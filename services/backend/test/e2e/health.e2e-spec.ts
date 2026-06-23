import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/database/prisma/prisma.service';
import { RedisService } from '../../src/infrastructure/redis/redis.service';

describe('Health (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let redisService: RedisService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        $queryRawUnsafe: jest.fn().mockResolvedValue([{ 1: 1 }]),
        $connect: jest.fn(),
        $disconnect: jest.fn(),
      })
      .overrideProvider(RedisService)
      .useValue({
        ping: jest.fn().mockResolvedValue('PONG'),
        getClient: jest.fn(),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    redisService = moduleFixture.get<RedisService>(RedisService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /health should return 200', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe('ok');
        expect(res.body.info.database.status).toBe('up');
      });
  });

  it('GET /health/ready should check all dependencies', () => {
    return request(app.getHttpServer())
      .get('/health/ready')
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe('ok');
        expect(res.body.info.database).toBeDefined();
        expect(res.body.info.redis).toBeDefined();
      });
  });
});
