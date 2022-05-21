import { ApolloDriverConfig, ApolloDriverConfigFactory } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Injectable()
export class ApolloConfigService implements ApolloDriverConfigFactory {
  constructor(private configService: ConfigService) {}

  createGqlOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile: join(process.cwd(), 'generated/schema.gql'),
      sortSchema: true,
      playground: !this.configService.get('app.sandbox'),
      plugins: this.configService.get('app.sandbox')
        ? [ApolloServerPluginLandingPageLocalDefault()]
        : undefined,
      debug: this.configService.get('app.debug') == 'development',
    };
  }
}
