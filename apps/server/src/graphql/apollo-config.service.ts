import { ApolloDriverConfig, ApolloDriverConfigFactory } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { get } from 'lodash';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { registerEnumType } from '@nestjs/graphql';
import { RepeatType } from '../tasks/entities/repeat.entity';

@Injectable()
export class ApolloConfigService implements ApolloDriverConfigFactory {
  constructor(private configService: ConfigService) {}

  createGqlOptions(): ApolloDriverConfig {
    registerEnumType(RepeatType, {
      name: 'RepeatType',
      description: 'Supported repeat types',
    });
    return {
      autoSchemaFile: join(process.cwd(), 'generated/schema.gql'),
      sortSchema: true,
      playground: !this.configService.get('app.sandbox'),
      plugins: this.configService.get('app.sandbox')
        ? [ApolloServerPluginLandingPageLocalDefault()]
        : undefined,
      debug: this.configService.get('app.debug') == 'development',
      context: ({ req, res, connection }) => {
        const clientId = get(connection, 'context.clientId');
        return { req, res, ...(clientId && { clientId }) };
      },
      cors: {
        // origin: '*',
        origin: "http://localhost:4200",
        credentials: true,
      },
    };
  }
}
