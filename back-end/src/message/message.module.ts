import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageResolver } from './message.resolver';
import { UrlShortenerService } from 'src/url-shortener/url-shortener.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService, MessageResolver, UrlShortenerService],
})
export class MessageModule {}
