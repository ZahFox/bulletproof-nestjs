import { INestApplication } from '@nestjs/common'
import { configLoader } from './config'

export * from './logger'

/**
 * The first invocation of runLoaders is used to complete any part of the startup process
 * that should happen before the NestJS application is created. This will return a function
 * that accepts the NestJS application as a parameter and finish the startup process using
 * the application.
 */
export async function runLoaders() {
  configLoader()
  return async (app: INestApplication) => {}
}
