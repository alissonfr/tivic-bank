import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
require('dotenv/config')

export function authorize(req: Request, res: Response, next: NextFunction): void {
    const token: string | undefined = req.headers['x-access-token'] as string | undefined;
    if (!token) {
       res.status(401).json({
          mensagem: 'Acesso negado!'
       })
    } else {
       jwt.verify(token, process.env.SALT_KEY, function (error: jwt.JsonWebTokenError | null) {
          if (error) {
             res.status(401).json({
                mensagem: 'Acesso negado! Faça o login'
             })
          } else {
             next()
          }
       })
    }
 }