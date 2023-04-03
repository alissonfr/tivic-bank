import { Knex } from 'knex'
import { knexconection as knex } from '@database/index'
import { Transaction } from '@models/Transaction'

export class TransactionsService {
   getTransactions (request: Partial<Transaction>): Knex.QueryBuilder<Transaction> {
      return knex('transactions').where('cod_bank_account', request.cod_bank_account)
   }

   getTransactionByID (id: number): Knex.QueryBuilder<Transaction> {
      return knex('transactions').andWhere('id_transaction', id).first()
   }

   setTransaction (request: Partial<Transaction>): Knex.QueryBuilder {
      return knex('transactions').insert(request)
   }

   updateUser (request: Partial<Transaction>): Knex.QueryBuilder {
      return knex('transactions').update(request).where('id_transaction', request.id_transaction)
   }

   deleteUser (id: number): unknown {
      try {
         return knex.transaction(async function (trx) {
            await trx('transactions').where('id_transaction', id).del()
         })
      } catch {
         return new Error()
      }
   }
}
