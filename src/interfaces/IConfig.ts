export enum ConfigProfileSource {
  ENV,
}

export enum ConfigProfileValue {
  NUMBER,
  STRING,
}

export type ConfigProfile<T> = {
  name: string
  source_type: ConfigProfileSource
  value_type: ConfigProfileValue
  default?: T
}

export type EnvConfigProfile<T> = ConfigProfile<T> & {
  env_name: string
}

export interface IConfig {
  httpPort: () => number
  get: <T>(name: string) => T
}

export interface IConfigLoader {
  set: (...profiles: Array<ConfigProfile<any>>) => void
}
