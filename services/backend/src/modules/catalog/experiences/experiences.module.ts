import { Module } from '@nestjs/common';
import { ExperiencesController } from './controllers/experiences.controller';
import { ExperiencesService } from './services/experiences.service';
import { PrismaModule } from '../../../database/prisma/prisma.module';
import { SlugService } from '../shared/slug.service';

@Module({
  imports: [PrismaModule],
  controllers: [ExperiencesController],
  providers: [ExperiencesService, SlugService],
})
export class ExperiencesModule {}