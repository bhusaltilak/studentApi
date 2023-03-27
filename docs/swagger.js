const swaggerData = {
    swaggerDefinition: {
      openapi: '3.0.1',
      info: {
        version: '1.0.0',
        title: 'Student System API',
        description: 'Keeps all the record of Students details',
        servers: ['http://localhost:4000'],
      },
      components: {
        securitySchemes: {
          jwt: {
            type: 'http' || 'https',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    apis: ['Routes/*.js'],
  };
  
  module.exports= swaggerData;
  