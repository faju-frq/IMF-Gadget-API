import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IMF Gadget API',
      version: '1.0.0',
      description:
        'A secure and robust RESTful API for managing users, gadgets, deployments, and self-destruction operations, built with Express.js, Sequelize, and PostgreSQL.'
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:5000'
      }
    ],
    tags: [
      {
        name: 'Auth',
        description: 'Authentication routes (register, login, logout, delete)'
      },
      {
        name: 'Gadgets',
        description: 'Gadget inventory and management'
      },
      {
        name: 'Deployment',
        description: 'Deploy gadgets to missions'
      },
      {
        name: 'Destruction',
        description: 'Self-destruction of gadgets'
      }
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apikey',
          in: 'cookie',
          name: 'token'
        }
      }
    }
  },
  apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
