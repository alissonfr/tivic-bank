import knex from 'knex'
import * as dotenv from 'dotenv'
dotenv.config()

export const knexconection = knex({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD || '',
    }
})