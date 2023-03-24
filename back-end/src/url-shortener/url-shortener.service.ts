import {
  HttpCode,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlShortenerService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  public async minifyUrl(url: string) {
    const appUrl = 'http://localhost:3000'; // to move to config
    const shortId = nanoid(6);
    console.log({ shortId });
    try {
      this.redis.set(shortId, url);
      return `${appUrl}/${shortId}`;
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot process you url for minification',
      );
    }
  }

  public async resolveUrl(shortUrl: string) {
    const { pathname } = new URL(shortUrl);
    const shortId = pathname.slice(1);
    const completeUrl = await this.redis.get(shortId).catch((error) => {
      throw new InternalServerErrorException({
        HttpCode: HttpStatus.NOT_FOUND,
        error: 'Cannot retrieve you url minified',
      });
    });
    if (!completeUrl) {
      throw new NotFoundException('Cannot found minified url request');
    }
    return completeUrl;
  }
}
