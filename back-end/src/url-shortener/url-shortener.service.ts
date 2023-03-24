import { Injectable } from '@nestjs/common';
import { AES } from 'crypto-js';

@Injectable()
export class UrlShortenerService {
  public minifyUrl(url: string): string {
    const key = 'key2';
    const appUrl = 'http://localhost:3000';
    const minified = AES.encrypt(url, key);
    const shortUrl = `${appUrl}/${minified}`;
    return shortUrl;
  }

  public resolveUrl(shortUrl: string): string {
    const { pathname } = new URL(shortUrl);
    const decryptedShortUrl = AES.decrypt(pathname, 'key2');
    return decryptedShortUrl.toString();
  }
}
