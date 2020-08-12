import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('boostrap');
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === "development") {
    logger.warn('Enabled CORS');
    app.enableCors();
  }
  const configServer = config.get('server');
  const port = process.env.PORT || configServer.port
  await app.listen(port);
  logger.log(`Application listenig on port ${port}`);
}

bootstrap();
