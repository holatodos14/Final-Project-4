import swaggerAutogen from 'swagger-autogen'

const swaggerAutogenInstance = swaggerAutogen()

const outputFile = './src/utils/swagger-output.json'
const endpointsFiles = [
  './src/routes/userRoutes.routes.js',
  './src/routes/postRoutes.routes.js',
  './src/routes/categoryRoutes.routes.js',
  './src/routes/commentRoutes.routes.js'
]

const doc = {
  info: {
    title: 'Blogging Platform API',
    description: 'API Documentation for the Blogging Platform',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  basePath: '/api',
  schemes: ['http']
}

swaggerAutogenInstance(outputFile, endpointsFiles, doc).then(() => {
  import('./src/index.js').catch(err => console.error(err))
})
