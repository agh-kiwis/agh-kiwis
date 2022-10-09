import { ApolloDriverConfig, ApolloDriverConfigFactory } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { registerEnumType } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { get } from 'lodash';
import { join } from 'path';
import { RepeatType } from '../tasks/entities/repeat.entity';

@Injectable()
export class ApolloConfigService implements ApolloDriverConfigFactory {
  constructor(private configService: ConfigService) {}

  createGqlOptions(): ApolloDriverConfig {
    // TODO This smells bad for me
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
        origin: this.configService.get('app.corsOrigin'),
        // We need credentials to accept Auth cookies
        credentials: true,
      },
    };
  }
}
