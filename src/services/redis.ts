import { Injectable } from '@nestjs/common'
import { Config } from '../config'
import { IRedisUtil, RedisConfig } from '../interfaces'

@Injectable()
export class RedisService implements IRedisUtil {
  public getConfig(): RedisConfig {
    return {
      host: Config.get<string>('Redis Host'),
      port: Config.get<number>('Redis Port'),
      pass: Config.get<string>('Redis Password'),
    }
  }
}
