import {
  Global,
  HttpCode,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { nanoid } from 'nanoid';

@Injectable()
@Global()
export class UrlShortenerService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  public async minifyUrl(url: string) {
    const appUrl = 'http://localhost:4000'; // to move to config
    const shortId = nanoid(6);
    console.log({ shortId });
    this.redis.set(shortId, url).catch((err) => {
      throw new InternalServerErrorException(
        'Cannot process you url for minification',
      );
    });
    return `${appUrl}/r/${shortId}`;
  }

  public async resolveShortUrl(shortUrl: string) {
    const { pathname } = new URL(shortUrl);
    const shortId = pathname.replace('/r', ''); // TODO this can be done more dinamically
    return this.resolveById(shortId);
  }

  public async resolveById(shortId: string) {
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
