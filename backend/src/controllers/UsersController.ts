import { Response, Request } from 'express'
import { UsersService } from 'src/services/UserService'

const service = new UsersService()
export class UsersController {

   // [GET]
   async getUsers(req: Request, res: Response) {
      try {
         const users = await service.getUsers()
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

         const add = await service.setUser(req.body)
         const user = await service.getUserByID(add[0])
         return res.status(201).json(user);
      } catch (err) {
         console.log(err)
         if (err.errno === 1062) {
            return res.status(409).json({ mensagem: 'O e-mail já está em uso!' });
         }
         return res.status(500).json({ mensagem: 'Ocorreu um erro no servidor!' });
      }
   }
}