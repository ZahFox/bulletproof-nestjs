import { Module } from '@nestjs/common'
import { JobsService } from './services'
import { RedisService } from './services/redis'

@Module({
  imports: [],
  controllers: [],
  providers: [JobsService, RedisService],
})
export class AppModule {}
