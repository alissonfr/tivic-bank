import { Knex } from 'knex'
import { knexconection as knex } from '@database/index'
import { User } from '@models/User'
import { generateRandomNumber } from 'src/utils/random'

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

   async setUserWithBankAccount(request: Partial<User>): Promise<Knex.QueryBuilder> {
      const trx = await knex.transaction();
      try {
        const [userId] = await trx('users').insert(request);

        await trx('bank_accounts').insert({
         agency: generateRandomNumber(1000, 9999),
         account_number: generateRandomNumber(1000, 99999999),
         account_checker: generateRandomNumber(1, 9),
         balance: 0,
         cod_user: userId,
        });

        await trx.commit();

        return userId;
      } catch (err) {
        await trx.rollback();
        throw err;
      }
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
