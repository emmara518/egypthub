import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseConfigService } from '../../config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private readonly dbConfig: DatabaseConfigService) {
    super({
      datasources: { db: { url: dbConfig.url } },
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.logger.log('Connected to PostgreSQL');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.log('Disconnected from PostgreSQL');
  }

  async setContextVariables(params: {
    userId?: string;
    partnerId?: string;
    clientIp?: string;
  }): Promise<void> {
    const queries: string[] = [];
    if (params.userId) queries.push(`SELECT set_config('app.current_user_id', '${params.userId}', true)`);
    if (params.partnerId) queries.push(`SELECT set_config('app.current_partner_id', '${params.partnerId}', true)`);
    if (params.clientIp) queries.push(`SELECT set_config('app.client_ip', '${params.clientIp}', true)`);
    if (queries.length > 0) {
      await this.$transaction(queries.map((q) => this.$queryRawUnsafe(q)));
    }
  }
}
