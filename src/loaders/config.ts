import { ConfigLoader } from 'src/config/config'
import {
  ConfigProfileSource,
  ConfigProfileValue,
  EnvConfigProfile,
} from 'src/interfaces'

export function configLoader() {
  const httpPort: EnvConfigProfile<number> = {
    name: 'HTTP Port',
    source_type: ConfigProfileSource.ENV,
    value_type: ConfigProfileValue.NUMBER,
    env_name: 'HTTP_PORT',
    default: 3000,
  }

  const redisHost: EnvConfigProfile<string> = {
    name: 'Redis Host',
    source_type: ConfigProfileSource.ENV,
    value_type: ConfigProfileValue.STRING,
    env_name: 'REDIS_HOST',
    default: '127.0.0.1',
  }

  const redisPort: EnvConfigProfile<number> = {
    name: 'Redis Port',
    source_type: ConfigProfileSource.ENV,
    value_type: ConfigProfileValue.NUMBER,
    env_name: 'REDIS_PORT',
    default: 6379,
  }

  const redisPassword: EnvConfigProfile<string> = {
    name: 'Redis Password',
    source_type: ConfigProfileSource.ENV,
    value_type: ConfigProfileValue.STRING,
    env_name: 'REDIS_PASS',
    default: 'changeme',
  }

  ConfigLoader.set(httpPort, redisHost, redisPort, redisPassword)
}
