import { User } from '@models/User'
import { Response, Request } from 'express'
import { UsersService } from 'src/services/UsersService'
import { comparePasswords, generateToken } from 'src/utils/auth'

const userService = new UsersService()

export class LoginController {

   // [POST]
   async login(req: Request, res: Response) {
      try {
         const requiredFields = [
            'email',
            'password',
         ]
         for (const field of requiredFields) {
            if (!req.body[field]) {
               return res.status(400).json({ mensagem: `O campo ${field} é obrigatório.` });
            }
         }

         const { email, password } = req.body

         const user: User = await userService.getUserByEmail(email)
         if (typeof user?.id_user === 'undefined') {
            return res.status(400).json({ mensagem: 'Email e/ou senha inválido(s)' });
         }

         const isPasswordValid: boolean = await comparePasswords(password, user.password)

         if (!isPasswordValid) {
            return res.status(400).json({ mensagem: 'Senha inválida!' });
         } else {
            const token = generateToken({ id_user: user.id_user, email: user.email })
            return res.status(201).json({
               token,
               user
            });
         }
      } catch (err) {
         console.log(err)
         return res.status(500).json({ mensagem: 'Ocorreu um erro no servidor!' });
      }
   }
}