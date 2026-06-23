import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmbassadorEarning } from './earning.entity';
import { EarningsService } from './earnings.service';
import { EarningsController } from './earnings.controller';
import { AmbassadorsModule } from '../ambassadors/ambassadors.module';

@Module({
  imports: [TypeOrmModule.forFeature([AmbassadorEarning]), AmbassadorsModule],
  providers: [EarningsService],
  controllers: [EarningsController],
  exports: [EarningsService],
})
export class EarningsModule {}
