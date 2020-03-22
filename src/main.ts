import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, runLoaders } from './loaders'
import { Config } from './config'

async function bootstrap() {
  try {
    const runLoadersWithApp = await runLoaders()
    const app: INestApplication = await NestFactory.create(AppModule)
    await runLoadersWithApp(app)
    await app.listen(Config.httpPort())
    Logger.info(`app listening to HTTP requests on port ${Config.httpPort()}`)
  } catch (err) {
    Logger.error('failed to boostrap the application')
    Logger.error(err)
  }
}

bootstrap()
