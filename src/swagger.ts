import swaggerJsDoc, { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple Library REST API',
      version: '1.0.0',
      description: 'API documentation for library REST API',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/presentations/routers/**/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
