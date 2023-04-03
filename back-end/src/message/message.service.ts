import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  save(message: string) {
    return this.messageRepository.save({ message });
  }

  findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  parseUrls(texte: string, caractereSubstitution: string = '%S') {
    const regex = /((?:https?):\/\/[^\s]+)/gi;
    return texte.replace(regex, caractereSubstitution.repeat(10));
  }
}
