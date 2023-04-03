import { BankAccount } from '@models/BankAccount';
import { Response, Request } from 'express'
import { BankAccountsService } from 'src/services/BankAccoutsService'

const bankAccountsService = new BankAccountsService()

export class BankAccountsController {

   // [GET]
   async getBankAccountByUser(req: Request, res: Response) {
      try {
         const requiredFields = [
            'cod_user'
         ]
         for (const field of requiredFields) {
            if (!req.query[field]) {
               return res.status(400).json({ mensagem: `O campo ${field} é obrigatório.` });
            }
         }

         const cod_user: any = req.query.cod_user
         const bankAccount: BankAccount = await bankAccountsService.getBankAccountByUser(cod_user)
         if (typeof bankAccount?.id_bank_account === 'undefined') {
            return res.status(400).json({ mensagem: 'Nenhuma conta bancária cadastrada para esse usuario' });
         }
         return res.status(200).json({ bank_account: bankAccount });
      } catch (err) {
         console.log(err)
         return res.status(500).json({ mensagem: 'Ocorreu um erro no servidor!' });
      }
   }
}