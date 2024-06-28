import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger-output.json'

const app = express()

export function swaggerSetup () {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

export default app
