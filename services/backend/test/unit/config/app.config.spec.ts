import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from '../../../src/config/app.config';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string, defaultValue?: unknown) => {
              const values: Record<string, unknown> = {
                PORT: 4000,
                API_PREFIX: 'api/v1',
                CORS_ORIGINS: 'http://localhost:3000',
                LOG_LEVEL: 'info',
                REQUEST_TIMEOUT_MS: 30000,
                NODE_ENV: 'test',
              };
              return (values[key] ?? defaultValue) as string;
            }),
            getOrThrow: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
    configService = module.get(ConfigService);
  });

  it('should return port', () => {
    expect(service.port).toBe(4000);
  });

  it('should return api prefix', () => {
    expect(service.apiPrefix).toBe('api/v1');
  });

  it('should parse cors origins', () => {
    expect(service.corsOrigins).toEqual(['http://localhost:3000']);
  });

  it('should return log level', () => {
    expect(service.logLevel).toBe('info');
  });

  it('should detect non-production', () => {
    expect(service.isProduction).toBe(false);
  });
});
