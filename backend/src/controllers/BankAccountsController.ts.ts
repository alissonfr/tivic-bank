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
            if (!req.body[field]) {
               return res.status(400).json({ mensagem: `O campo ${field} é obrigatório.` });
            }
         }

         const bankAccount = await bankAccountsService.getBankAccountByUser(req.body.cod_user)
         return res.json(bankAccount);
      } catch (err) {
         console.log(err)
         return res.status(500).json({ mensagem: 'Ocorreu um erro no servidor!' });
      }
   }
}