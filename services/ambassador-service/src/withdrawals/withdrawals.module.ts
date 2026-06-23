import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WithdrawalRequest } from './withdrawal.entity';
import { WithdrawalsService } from './withdrawals.service';
import { WithdrawalsController } from './withdrawals.controller';
import { AmbassadorsModule } from '../ambassadors/ambassadors.module';

@Module({
  imports: [TypeOrmModule.forFeature([WithdrawalRequest]), AmbassadorsModule],
  providers: [WithdrawalsService],
  controllers: [WithdrawalsController],
  exports: [WithdrawalsService],
})
export class WithdrawalsModule {}
