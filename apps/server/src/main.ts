import * as fs from 'fs';
import { Logger, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupApp } from './utils/setup';
import validationOptions from './utils/validation-options';

async function bootstrap() {
  const options: NestApplicationOptions = {};

  if (process.env.NODE_ENV == 'production') {
    options.httpsOptions = {
      key: fs.readFileSync('./secrets/privkey.pem'),
      cert: fs.readFileSync('./secrets/fullchain.pem'),
    };
  }

  const app = await NestFactory.create(AppModule, options);
  await setupApp();

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  const port = process.env.BACKEND_PORT || 3333;
  const host =
    process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'http://localhost:3333';

  await app.listen(port);
  Logger.log(`App is running in ${process.env.NODE_ENV} mode`);
  Logger.log(`🚀 Application is running on: ${host}/graphql`);
}

bootstrap();
