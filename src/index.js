import express from 'express'
import morgan from 'morgan'
import { PORT } from './config/config.js'
import { swaggerSetup } from './utils/swagger.js'

import userRoutes from './routes/userRoutes.routes.js'
import postRoutes from './routes/postRoutes.routes.js'
import categoryRoutes from './routes/categoryRoutes.routes.js'
import commentRoutes from './routes/commentRoutes.routes.js'
import { errorHandler } from './middlewares/errorMiddleware.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

swaggerSetup(app)

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/comments', commentRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
