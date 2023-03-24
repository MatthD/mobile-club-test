import { Module } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { UrlShortenerController } from './url-shortener.controller';
import { RedisModule } from '@nestjs-modules/ioredis/dist/redis.module';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        url: 'redis://localhost:6379/4',
      },
    }),
  ],
  providers: [UrlShortenerService],
  controllers: [UrlShortenerController],
})
export class UrlShortenerModule {}
