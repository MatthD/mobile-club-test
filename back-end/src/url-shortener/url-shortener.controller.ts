import { Controller, Post, Body } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { MinifyUrlDto } from './url-shortener.dto';

@Controller('url-shortener')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post('minify')
  public async minifyUrl(@Body() dto: MinifyUrlDto) {
    const { url } = dto;
    const shortUrl = this.urlShortenerService.minifyUrl(url);
    return { url: shortUrl };
  }
}
