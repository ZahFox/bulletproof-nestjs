import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './loaders';

async function bootstrap() {
  try {
    const app: INestApplication = await NestFactory.create(AppModule);
    await app.listen(3000);
    Logger.info('app listening on port 3000')
  } catch (err) {
    Logger.error('failed to boostrap the application')
    Logger.error(err)
  }
}

bootstrap();
