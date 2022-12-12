import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CategoriesModule } from '../categories/categories.module';
import appConfig from '../config/app.config';
import authConfig from '../config/auth.config';
import databaseConfig from '../config/database.config';
import { TypeOrmConfigService } from '../database/typeorm-config.service';
import { ApolloConfigService } from '../graphql/apollo-config.service';
import { TasksModule } from '../tasks/tasks.module';
import { UsersModule } from '../users/users.module';
import { IntervalScalar } from '../utils/interval.scalar';
import { WorkersModule } from '../workers/workers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // This is needed to granulate env vars usage
    // And mock tests in future
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
    WorkersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    IntervalScalar,
  ],
})
export class AppModule {}

// Export this module
