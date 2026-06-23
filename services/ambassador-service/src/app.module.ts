import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmbassadorsModule } from './ambassadors/ambassadors.module';
import { EarningsModule } from './earnings/earnings.module';
import { WithdrawalsModule } from './withdrawals/withdrawals.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL', 'postgresql://egypthub:egypthub_secret_2024@localhost:5432/egypthub_dev'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AmbassadorsModule,
    EarningsModule,
    WithdrawalsModule,
  ],
})
export class AppModule {}
