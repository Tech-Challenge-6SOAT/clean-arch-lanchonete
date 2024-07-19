import { Logger } from "../../logs/logger"
import mongoose from "mongoose"

const connection = () => {
  const mongoUsername = 'admin'
  const mongoPassword = 'admin'
  const mongoHost = 'localhost:27017'
  const mongoDatabase = 'lanchonete'
  const url = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}/${mongoDatabase}?retryWrites=true&w=majority`
  const conn = mongoose.createConnection(url)

  conn.once('connected', () => {
    Logger.info('MongoDB is connected!')
  })

  conn.on('error', (err: Error) => {
    Logger.error(`MongoDBconnection error: ${err.message}`)
  })

  conn.on('disconnected', () => {
    Logger.error('MongoDB disconnected')
  })

  return conn
}

export const ObjectId = mongoose.Types.ObjectId;
export const mongoConnection = connection()
