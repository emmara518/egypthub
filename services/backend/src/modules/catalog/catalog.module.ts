import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { DestinationsModule } from './destinations/destinations.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { StoriesModule } from './stories/stories.module';
import { OffersModule } from './offers/offers.module';
import { PartnersModule } from './partners/partners.module';
import { SearchModule } from './search/search.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    CategoriesModule,
    DestinationsModule,
    ExperiencesModule,
    StoriesModule,
    OffersModule,
    PartnersModule,
    SearchModule,
    MediaModule,
  ],
})
export class CatalogModule {}
