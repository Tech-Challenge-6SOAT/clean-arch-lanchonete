// import { Logger } from "../../logs/logger"
import mongoose from "mongoose"

const connection = () => {
  // const mongoUsername = process.env.MONGODB_USERNAME
  // const mongoPassword = process.env.MONGODB_PASSWORD
  // const mongoHost = process.env.MONGODB_HOST
  // const mongoDatabase = process.env.MONGODB_DATABASE
  // const url = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}/${mongoDatabase}?retryWrites=true&w=majority`
  const url = `mongodb://admin:admin@localhost:27017/lanchonete?retryWrites=true&w=majority`
  const conn = mongoose.createConnection(url)

  conn.once('connected', () => {
    console.info('MongoDB is connected!')
  })

  conn.on('error', (err: Error) => {
    console.error(`MongoDBconnection error: ${err.message}`)
  })

  conn.on('disconnected', () => {
    console.error('MongoDB disconnected')
  })

  return conn
}

export const ObjectId = mongoose.Types.ObjectId;
export const mongoConnection = connection()
