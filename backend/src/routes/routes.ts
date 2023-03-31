import { Router } from 'express'
import fs from 'fs'
const routes = Router()

fs.readdirSync('./src/routes').forEach(async (file) => {
   if (file === 'routes.ts') {
      return
   }
   const active = await import(`./${file}/${file}`)
   routes.use(`/v1/${file}`, active.default)
})

export default routes
