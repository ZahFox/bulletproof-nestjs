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

  ConfigLoader.set(httpPort)
}
