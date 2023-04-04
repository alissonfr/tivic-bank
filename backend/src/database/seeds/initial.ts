import { Knex } from "knex";
import { generatePassword } from '../../utils/auth'
import { generateRandomNumber } from 'src/utils/random'

export async function seed(knex: Knex): Promise<void> {
    await knex("users").del();
    await knex("bank_accounts").del();

    await knex("users").insert([
        {
            name: "Alisson Rodrigues Fernandes",
            email: "alisson@gmail.com",
            password: await generatePassword("teste"),
            cpf: "04151002584",
            birth: "2003-03-29"
        }
    ]);

    await knex("bank_accounts").insert([
        {
            agency: generateRandomNumber(1000, 9999),
            account_number: generateRandomNumber(1000, 99999999),
            account_checker: generateRandomNumber(1, 9),
            balance: 0,
            cod_user: 1,
        }
    ]);
}
