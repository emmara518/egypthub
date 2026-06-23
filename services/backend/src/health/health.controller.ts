import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HealthCheckService, HealthCheck, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../database/prisma/prisma.service';
import { RedisService } from '../infrastructure/redis/redis.service';
import { Public } from '../common/decorators';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prismaIndicator: PrismaHealthIndicator,
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Liveness check — database only' })
  check() {
    return this.health.check([
      () => this.prismaIndicator.pingCheck('database', this.prisma),
    ]);
  }

  @Public()
  @Get('ready')
  @HealthCheck()
  @ApiOperation({ summary: 'Readiness check — database, Redis, queue' })
  checkReady() {
    return this.health.check([
      () => this.prismaIndicator.pingCheck('database', this.prisma),
      () =>
        this.redis
          .ping()
          .then(() => ({ redis: { status: 'up' } }))
          .catch(() => ({ redis: { status: 'down' } })),
    ]);
  }

  @Public()
  @Get('startup')
  @HealthCheck()
  @ApiOperation({ summary: 'Startup check — database and migrations' })
  checkStartup() {
    return this.health.check([
      () => this.prismaIndicator.pingCheck('database', this.prisma),
    ]);
  }
}
