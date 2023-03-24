import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { MessageModule } from './message/message.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';

const graphQLConfig = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  debug: false,
  playground: true,
  autoSchemaFile: true,
});

const typeORMConfig = TypeOrmModule.forRoot();

const modules = [MessageModule];

@Module({
  imports: [graphQLConfig, typeORMConfig, ...modules, UrlShortenerModule],
})
export class AppModule {
  constructor(private _connection: Connection) {}
}
