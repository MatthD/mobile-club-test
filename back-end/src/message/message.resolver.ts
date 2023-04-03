import { Inject, Injectable, UsePipes } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageDto } from './message.dtos';
import { MessagePipe } from './message.pipe';
import { MessageService } from './message.service';

@Resolver()
export class MessageResolver {
  @Inject(MessageService)
  private messageService: MessageService;

  @Query((_returns) => [MessageDto])
  messages() {
    return this.messageService.findAll();
  }

  @Mutation((_returns) => MessageDto)
  @UsePipes(MessagePipe)
  message(
    @Args('message', { type: () => String })
    message: string,
  ) {
    return this.messageService.save(message);
  }
}
