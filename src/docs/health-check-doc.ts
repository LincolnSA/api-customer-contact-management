const tag = 'Health Check';
const entity = 'Health Check';
const resource = 'health-check';

export default {
  [`/${resource}`]: {
    get: {
      summary: `Get a ${entity}`,
      description: `Get a ${entity}`,
      tags: [tag],
      security: [],
      responses: {
        200: {
          description: 'Serviço está funcionando',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Serviço está funcionando' },
                  data: {
                    type: 'object',
                    example: {
                      service: {
                        status: 'healthy',
                        timestamp: '2025-05-16T14:22:45.564Z',
                        uptime: 142.770099326,
                        memory: {
                          rss: 101146624,
                          heapTotal: 19509248,
                          heapUsed: 17428888,
                          external: 5124460,
                          arrayBuffers: 33283
                        }
                      },
                      database: {
                        status: 'connected'
                      }
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
      }
    }
  }
} 