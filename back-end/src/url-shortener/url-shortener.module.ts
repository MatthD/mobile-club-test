import { Module } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';

@Module({
  providers: [UrlShortenerService]
})
export class UrlShortenerModule {}
