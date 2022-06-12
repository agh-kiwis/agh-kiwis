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
import { UsersModule } from '../users/users.module';
import { TasksModule } from '../tasks/tasks.module';
import authConfig from '../config/auth.config';
import { AuthModule } from '../auth/auth.module';
import { CategoriesModule } from '../categories/categories.module';
import { IntervalScalar } from '../utils/interval.scalar';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig],
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
    AuthModule,
    UsersModule,
    TasksModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  // TODO Maybe move IntervalScalar somewhere else
  providers: [AppService, IntervalScalar],
})
export class AppModule {}
