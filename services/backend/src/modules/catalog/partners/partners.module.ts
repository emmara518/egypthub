import { Module } from '@nestjs/common';
import { PartnersController } from './controllers/partners.controller';
import { PartnersService } from './services/partners.service';
import { PrismaModule } from '../../../database/prisma/prisma.module';
import { SlugService } from '../shared/slug.service';

@Module({
  imports: [PrismaModule],
  controllers: [PartnersController],
  providers: [PartnersService, SlugService],
})
export class PartnersModule {}