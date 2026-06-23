import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { PrismaModule } from '../../../database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SearchService],
})
export class SearchModule {}