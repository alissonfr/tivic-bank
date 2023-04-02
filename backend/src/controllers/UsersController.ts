import { BankAccount } from '@models/BankAccount'
import { User } from '@models/User'
import { Response, Request } from 'express'
import { BankAccountsService } from 'src/services/BankAccoutsService'
import { UsersService } from 'src/services/UserService'
import { generatePassword } from 'src/utils/auth'

const userService = new UsersService()
const bankAccountService = new BankAccountsService()
export class UsersController {

   // [GET]
   async getUsers(req: Request, res: Response) {
      try {
         const users = await userService.getUsers()
         return res.json(users);
      } catch (err) {
         console.log(err)
         return res.status(500).json({ mensagem: 'Ocorreu um erro no servidor!' });
      }
   }

   // [POST]
   async setUser(req: Request, res: Response) {
      try {
         const requiredFields = [
            'name',
            'email',
            'password',
            'cpf',
            'birth'
         ]
         for (const field of requiredFields) {
            if (!req.body[field]) {
               return res.status(400).json({ mensagem: `O campo ${field} é obrigatório.` });
            }
         }

         req.body.password = await generatePassword(req.body.password)

         const add = await userService.setUserWithBankAccount(req.body)
         const user: User = await userService.getUserByID(add)

         const bankAccount: BankAccount = await bankAccountService.getBankAccountByUser(add)
         return res.status(201).json({
            user,
            bank_account: bankAccount
         });
      } catch (err) {
         console.log(err)
         if (err.errno === 1062) {
            return res.status(409).json({ mensagem: 'O e-mail já está em uso!' });
         }
         return res.status(500).json({ mensagem: 'Ocorreu um erro no servidor!' });
      }
   }
}