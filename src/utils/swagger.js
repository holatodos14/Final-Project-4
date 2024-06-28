import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:3000'
}

const outputFile = './src/utils/swagger-output.json'
const routes = ['./src/routes/userRoutes.routes.js',
  './src/routes/postRoutes.routes.js',
  './src/routes/categoryRoutes.routes.js',
  './src/routes/commentRoutes.routes.js'
]

swaggerAutogen()(outputFile, routes, doc)
