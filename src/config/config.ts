import dotenv from 'dotenv'
import {
  ConfigProfile,
  ConfigProfileSource,
  ConfigProfileValue,
  EnvConfigProfile,
  IConfigLoader,
} from '../interfaces'

const configValueCache = new Map<string, any>()

function makeConfig() {
  dotenv.config()

  function get<T>(name: string) {
    const cacheValue = configValueCache.get(name)
    if (cacheValue) {
      return cacheValue as T
    }

    const profile = configProfileMap.get(name)
    if (!profile) {
      throw new Error(`could not find a config profile named: ${name}`)
    }

    const sourceValue = getValueFromSource(profile)
    const value = convertSourceValue<T>(profile, sourceValue)
    configValueCache.set(name, value)
    return value
  }

  return {
    get,
    httpPort: () => get<number>('HTTP Port'),
  }
}

export const Config = makeConfig()

const configProfileMap = new Map<string, ConfigProfile<any>>()

export const ConfigLoader: IConfigLoader = {
  set: (...profiles: Array<ConfigProfile<any>>) => {
    for (const profile of profiles) {
      const existingProfile = configProfileMap.get(profile.name)
      if (existingProfile) {
        throw new Error(`duplicate config profile named: ${profile.name}`)
      }

      configProfileMap.set(profile.name, Object.freeze(profile))
    }
  },
}

function convertSourceValue<T>(profile: ConfigProfile<any>, value: any): T {
  if (isNullOrUndefined(value) && !isNullOrUndefined(profile.default)) {
    value = profile.default
  }

  const valueType = typeof value

  if (profile.value_type === ConfigProfileValue.NUMBER) {
    switch (valueType) {
      case 'number':
      case 'bigint': {
        return value
      }

      case 'string': {
        const numberValue = Number(value)
        if (Number.isNaN(numberValue)) {
          throw new Error(
            `the ${profile.name} config value must have a number value. got: ${value}`,
          )
        }
        return numberValue as any
      }

      case 'boolean': {
        if (value === true) {
          return 1 as any
        } else {
          return 0 as any
        }
      }

      default: {
        throw new Error(
          `the ${profile.name} config value must have a number value. got: ${value}`,
        )
      }
    }
  }

  if (profile.value_type === ConfigProfileValue.STRING) {
    switch (valueType) {
      case 'string': {
        return value
      }

      case 'object': {
        throw new Error(
          `the ${profile.name} config value must have a number value. got: ${value}`,
        )
      }

      default: {
        return String(value) as any
      }
    }
  }

  throw new Error(
    `unsupported config profile value type: ${profile.value_type}`,
  )
}

function getValueFromSource(profile: ConfigProfile<any>): any {
  if (hasEnvSource(profile)) {
    return process.env[profile.env_name]
  }

  throw new Error(
    `unsupported config profile source type: ${profile.source_type}`,
  )
}

function hasEnvSource(
  profile: ConfigProfile<any>,
): profile is EnvConfigProfile<any> {
  return profile.source_type === ConfigProfileSource.ENV
}

function isNullOrUndefined(value: any) {
  return typeof value === 'undefined' || (typeof value === 'object' && !value)
}
