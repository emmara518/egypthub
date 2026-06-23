import { Module } from '@nestjs/common';
import { DestinationsController } from './controllers/destinations.controller';
import { DestinationsService } from './services/destinations.service';
import { PrismaModule } from '../../../database/prisma/prisma.module';
import { SlugService } from '../shared/slug.service';

@Module({
  imports: [PrismaModule],
  controllers: [DestinationsController],
  providers: [DestinationsService, SlugService],
})
export class DestinationsModule {}