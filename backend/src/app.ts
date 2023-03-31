import express from 'express'
import cors from 'cors'
import routes from './routes/routes'

const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(cors())

app.use(routes)

export { app }
