import { Controller, Post, Body, Redirect, Get, Param } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { MinifyUrlDto, ResolveUrlDto } from './url-shortener.dto';

@Controller()
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post('minify')
  public async minifyUrl(@Body() dto: MinifyUrlDto) {
    const { url } = dto;
    const shortUrl = await this.urlShortenerService.minifyUrl(url);
    return { url: shortUrl };
  }

  @Post('resolve')
  public async resolveUrl(@Body() dto: ResolveUrlDto) {
    const { url } = dto;
    const longUrl = await this.urlShortenerService.resolveShortUrl(url);
    return { url: longUrl };
  }

  @Get('r/:id')
  @Redirect()
  public async redirectUrl(@Param('id') id) {
    const longUrl = await this.urlShortenerService.resolveById(id);
    return { url: longUrl, statusCode: 302 };
  }
}
