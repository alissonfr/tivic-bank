
import * as dotenv from 'dotenv'
dotenv.config()

export default {
  client: 'mysql2',
  connection: {
    charset: 'utf8',
    timezone: 'UTC',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD || '',
  },
  migrations: {
    directory: 'src/database/migrations',
    tableName: 'migrations'
  },
  seeds: {
    directory: 'src/database/seeds'
  }
}
