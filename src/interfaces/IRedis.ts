export type RedisConfig = {
  host: string
  port: number
  pass: string
}

export interface IRedisUtil {
  getConfig: () => RedisConfig
}
