import { Knex } from 'knex'
import { knexconection as knex } from '@database/index'
import { User } from '@models/User'

export class UsersService {
   getUsers (): Knex.QueryBuilder<User> {
      return knex('users')
   }

   getUserByID (id: number): Knex.QueryBuilder<User> {
      return knex('users').andWhere('id_user', id).first()
   }

   setUser (request: Partial<User>): Knex.QueryBuilder {
      return knex('users').insert(request)
   }

   updateUser (request: Partial<User>): Knex.QueryBuilder {
      return knex('users').update(request).where('id_user', request.id_user)
   }

   deleteUser (id: number): unknown {
      try {
         return knex.transaction(async function (trx) {
            await trx('users').where('id_user', id).del()
         })
      } catch {
         return new Error()
      }
   }
}
