import { Module } from '@nestjs/common';
import { OffersController } from './controllers/offers.controller';
import { OffersService } from './services/offers.service';
import { PrismaModule } from '../../../database/prisma/prisma.module';
import { SlugService } from '../shared/slug.service';

@Module({
  imports: [PrismaModule],
  controllers: [OffersController],
  providers: [OffersService, SlugService],
})
export class OffersModule {}