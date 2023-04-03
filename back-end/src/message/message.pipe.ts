import { Injectable, PipeTransform } from '@nestjs/common';
import { UrlShortenerService } from '../url-shortener/url-shortener.service';
@Injectable()
export class MessagePipe implements PipeTransform {
  constructor(private urlShortner: UrlShortenerService) {}
  async transform(message: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = message.match(urlRegex);
    // No url found, nothing to do, return the message
    if (!urls?.length) {
      return message;
    }

    // TODO This is doing side effect, maybe betetr in a middleware??
    const miniUrlsProm = urls.map(async (url) => {
      return this.urlShortner.minifyUrl(url);
    });

    const miniUrls = await Promise.all(miniUrlsProm);

    // replace long url with shortner urls
    const fixedMessage = message.replace(urlRegex, (match, p1) => {
      const miniUrl = miniUrls.shift();
      return miniUrl ?? p1;
    });

    return fixedMessage;
  }
}
