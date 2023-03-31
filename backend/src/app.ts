import express from 'express'
import cors from 'cors'
import routes from './routes/routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(routes)

export { app }
