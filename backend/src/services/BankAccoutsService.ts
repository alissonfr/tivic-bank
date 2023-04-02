import { Knex } from 'knex'
import { knexconection as knex } from '@database/index'
import { BankAccount } from '@models/BankAccount'

export class BankAccountsService {
   getBankAccounts (): Knex.QueryBuilder<BankAccount> {
      return knex('bank_accounts')
   }

   getBankAccountByID (id: number): Knex.QueryBuilder<BankAccount> {
      return knex('bank_accounts').andWhere('id_bank_account', id).first()
   }

   setBankAccount (request: Partial<BankAccount>): Knex.QueryBuilder {
      return knex('bank_accounts').insert(request)
   }

   updateBankAccount (request: Partial<BankAccount>): Knex.QueryBuilder {
      return knex('bank_accounts').update(request).where('id_bank_account', request.id_bank_account)
   }

   deleteBankAccount (id: number): unknown {
      try {
         return knex.transaction(async function (trx) {
            await trx('bank_accounts').where('id_bank_account', id).del()
         })
      } catch {
         return new Error()
      }
   }
}
