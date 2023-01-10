import { useContainer } from 'class-validator';
import * as fs from 'fs';
import { Logger, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupApp } from './utils/setup';
import validationOptions from './utils/validation-options';

async function bootstrap() {
  const options: NestApplicationOptions = {};

  // TODO This needs to be moved to nginx layer
  if (process.env.NODE_ENV == 'production') {
    options.httpsOptions = {
      key: fs.readFileSync('./secrets/privkey.pem'),
      cert: fs.readFileSync('./secrets/fullchain.pem'),
    };
  }

  const app = await NestFactory.create(AppModule, options);

  // This is needed for class-validator to work with nestjs
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  // Custom app setup
  await setupApp(app);

  const port = process.env.BACKEND_PORT || 3333;
  const host =
    process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'http://localhost:3333';

  await app.listen(port);
  Logger.log(`App is running in ${process.env.NODE_ENV} mode`);
  Logger.log(`🚀 Application is running on: ${host}/graphql`);
}

bootstrap();
