import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('id_user').primary()
        table.string('name', 145).notNullable()
        table.string('email', 125).notNullable().unique()
        table.string('password', 250).notNullable()
        table.string('cpf', 250).notNullable()
        table.date('birth')

        table.timestamp('date_created').defaultTo(knex.fn.now())
        table.timestamp('date_updated').defaultTo(knex.fn.now())
      })

      await knex.schema.createTable('bank_accounts', (table) => {
        table.increments('id_bank_account').primary()
        table.string('account_number', 45).notNullable()
        table.decimal('balance', 10, 2).notNullable()
        table.integer('cod_user').unsigned().references('id_user').inTable('users').notNullable()

        table.timestamp('date_created').defaultTo(knex.fn.now())
        table.timestamp('date_updated').defaultTo(knex.fn.now())
      })

      await knex.schema.createTable('transactions', (table) => {
        table.increments('id_transaction').primary()
        table.decimal('amount', 10, 2).notNullable()
        table.integer('operation').notNullable()
        table.integer('cod_bank_account').unsigned().references('id_bank_account').inTable('bank_accounts').notNullable()

        table.timestamp('date_created').defaultTo(knex.fn.now())
      })

      // Trigger para atualizar o saldo da conta bancária toda vez que uma transação é feita
      await knex.schema.raw(`
        CREATE TRIGGER update_balance
        AFTER INSERT ON transactions
        FOR EACH ROW
        BEGIN
            UPDATE bank_accounts
            SET balance = balance + NEW.amount
            WHERE id_bank_account = NEW.cod_bank_account;
        END;
      `)
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.raw(`
    DROP TRIGGER IF EXISTS update_balance;
    `)
    await knex.schema.dropTableIfExists('transactions')
    await knex.schema.dropTableIfExists('bank_accounts')
    await knex.schema.dropTableIfExists('users')
}

