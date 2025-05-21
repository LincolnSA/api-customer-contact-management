import swaggerJSDoc from "swagger-jsdoc";
import healthCheckDocs from "./health-check-doc";
import authDocs from "./auth-doc";
import customerDocs from "./customer-doc";
import contactDocs from "./contact-doc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Customer Contact Management API',
      description: 'API for managing customer contacts, including CRUD operations and additional functionality.',
      contact: {
        name: 'Technical Support',
        email: 'suporte@exemplo.com',
        url: 'https://exemplo.com/suporte'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Environment'
      },
      {
        url: 'https://api-homologacao.exemplo.com',
        description: 'Homologation Environment'
      },
      {
        url: 'https://api.exemplo.com',
        description: 'Production Environment'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format: Bearer <token>'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    paths: {
      ...healthCheckDocs,
      ...authDocs,
      ...customerDocs,
      ...contactDocs,
    },
  },
  apis: ['./src/routes*.ts'],
};

export default swaggerJSDoc(options);
