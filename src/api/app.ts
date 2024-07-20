import Fastify from 'fastify'
import dotenv from 'dotenv'
import routes from './routes'
import { Logger } from '../external/logs/logger'

export class App {
  static async start() {
    dotenv.config()
    const app = Fastify()
    await app.register(routes)
    await app.ready()
    await app.listen({
      port: 3000,
      host: '0.0.0.0'
    })
    Logger.info('API IS RUNNING')
  }
}
