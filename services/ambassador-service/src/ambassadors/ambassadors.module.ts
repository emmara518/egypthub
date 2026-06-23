import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ambassador } from './ambassador.entity';
import { AmbassadorsService } from './ambassadors.service';
import { AmbassadorsController } from './ambassadors.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ambassador])],
  providers: [AmbassadorsService],
  controllers: [AmbassadorsController],
  exports: [AmbassadorsService],
})
export class AmbassadorsModule {}
