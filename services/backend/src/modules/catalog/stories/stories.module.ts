import { Module } from '@nestjs/common';
import { StoriesController } from './controllers/stories.controller';
import { StoriesService } from './services/stories.service';
import { PrismaModule } from '../../../database/prisma/prisma.module';
import { SlugService } from '../shared/slug.service';

@Module({
  imports: [PrismaModule],
  controllers: [StoriesController],
  providers: [StoriesService, SlugService],
})
export class StoriesModule {}