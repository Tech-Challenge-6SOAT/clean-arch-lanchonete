import Fastify from 'fastify'
import dotenv from 'dotenv'
import routes from './routes'

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
    console.log('API IS RUNNING')
  }
}
