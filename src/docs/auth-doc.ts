const tag = 'Authentication';
const entity = 'Authentication';
const resource = 'auth';

export default {
  [`/${resource}/login`]: {
    post: {
      summary: `Login`,
      description: `Login`,
      tags: [tag],
      security: [],
      parameters: [
        {
          name: 'body',
          in: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string', example: 'lincoln@gmail.com' },
            }
          }
        }
      ],
      responses: {
        200: {
          description: 'Login realizado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Login realizado com sucesso' },
                  data: {
                    type: 'object',
                    example: {
                      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
                    }
                  }
                }
              }
            }
          }
        },
        500: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Erro interno do servidor' },
                }
              }
            }
          }
        }
      },
    }
  }
} 