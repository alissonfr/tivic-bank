import * as dotenv from 'dotenv'
import { app } from './app'
dotenv.config()

app.listen()

const server = app.listen(parseInt(process.env.PORT) || 3000, () => {
    console.log(`🚀 Server is listening at ${process.env.PORT || 3000}`)
 })

 export default { server }