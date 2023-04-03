import { Transaction } from '@models/Transaction'
import { Response, Request } from 'express'
import { TransactionsService } from 'src/services/TransactionsService'

const transactionsService = new TransactionsService()

export class TransactionsController {

   // [GET]
   async getTransactions(req: Request, res: Response) {
      try {
         const requiredFields = [
            'cod_bank_account'
         ]
         for (const field of requiredFields) {
            if (!req.query[field]) {
               return res.status(400).json({ mensagem: `O campo ${field} é obrigatório.` });
            }
         }

         const transactions = await transactionsService.getTransactions(req.query)
         if (transactions.length === 0) {
            return res.status(203).json({ mensagem: 'Nenhuma transação para esta conta bancária' });
         }
         return res.json({transactions: transactions});
      } catch (err) {
         console.log(err)
         return res.status(500).json({ mensagem: 'Ocorreu um erro no servidor!' });
      }
   }

   // [POST]
   async setTransaction(req: Request, res: Response) {
      try {
         const requiredFields = [
            'amount',
            'operation',
            'cod_bank_account'
         ]
         for (const field of requiredFields) {
            if (!req.body[field]) {
               return res.status(400).json({ mensagem: `O campo ${field} é obrigatório.` });
            }
         }

         const add = await transactionsService.setTransaction(req.body)
         const transaction: Transaction = await transactionsService.getTransactionByID(add[0])

         return res.status(201).json({ transaction });
      } catch (err) {
         console.log(err)
         return res.status(500).json({ mensagem: 'Ocorreu um erro no servidor!' });
      }
   }
}