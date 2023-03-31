import { Response, Request } from 'express'

export class UsersController {
   async getUser(req: Request, res: Response): Promise<void> {
    const token = req.headers['x-access-token']
    console.log(token)
    res.send("API funcionando!");
   }
}
