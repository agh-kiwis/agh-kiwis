import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '../config/database.config';
import { TypeOrmConfigService } from '../database/typeorm-config.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from '../config/app.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloConfigService } from '../graphql/apollo-config.service';
import { ApolloDriver } from '@nestjs/apollo';
import { HelloResolver } from '../resolvers/hello.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useClass: ApolloConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, HelloResolver],
})
export class AppModule {}
