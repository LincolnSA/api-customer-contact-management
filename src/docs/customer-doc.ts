const tag = 'Customer';
const entity = 'customer';
const resource = 'customers';

export default {
  [`/${resource}`]: {
    post: {
      summary: `Create a ${entity}`,
      description: `Create a ${entity}`,
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
              name: {
                type: 'string',
                example: 'John Doe'
              },
              email: {
                type: 'string',
                example: 'john.doe@example.com'
              },
              cpf: {
                type: 'string',
                example: '12345678901'
              },
              phone: {
                type: 'string',
                example: '12345678901'
              },
              address: {
                type: 'string',
                example: '1234 Main St, Anytown, USA'
              },
            }
          }
        }
      ],
      responses: {
        201: {
          description: 'Cliente criado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Cliente criado com sucesso'
                  },
                  data: {
                    type: 'object',
                    example: {
                      id: '9cc2fcaa-9095-4577-90fb-3e13d13525b0',
                      name: 'John Doe',
                      email: 'john.doe@example.com',
                      cpf: '12345678901',
                      phone: '12345678901',
                      address: '1234 Main St, Anytown, USA',
                      createdAt: '2025-05-02T11:29:54.013Z',
                      updatedAt: '2025-05-02T11:31:00.266Z',
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
    },
    get: {
      summary: `Get all ${entity}`,
      description: `Get all ${entity}`,
      tags: [tag],
      parameters: [],
      responses: {
        200: {
          description: 'Clientes listados com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Clientes listados com sucesso' },
                  data: { type: 'array', example: [] }
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
    },
  },
  [`/${resource}/{id}`]: {
    get: {
      summary: `Get a ${entity}`,
      description: `Get a ${entity}`,
      tags: [tag],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', example: '9cc2fcaa-9095-4577-90fb-3e13d13525b0' }
        }
      ],
      responses: {
        200: {
          description: 'Cliente encontrado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Cliente encontrado com sucesso' },
                  data: {
                    type: 'object', example: {
                      id: '9cc2fcaa-9095-4577-90fb-3e13d13525b0',
                      name: 'John Doe',
                      email: 'john.doe@example.com',
                      cpf: '12345678901',
                      phone: '12345678901',
                      address: '1234 Main St, Anytown, USA',
                      createdAt: '2025-05-02T11:29:54.013Z',
                      updatedAt: '2025-05-02T11:31:00.266Z',
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
    },
    put: {
      summary: `Update a ${entity}`,
      description: `Update a ${entity}`,
      tags: [tag],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', example: '9cc2fcaa-9095-4577-90fb-3e13d13525b0' }
        },
        {
          name: 'body',
          in: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'John Doe' },
              email: { type: 'string', example: 'john.doe@example.com' },
              cpf: { type: 'string', example: '12345678901' },
              phone: { type: 'string', example: '12345678901' },
              address: { type: 'string', example: '1234 Main St, Anytown, USA' },
            }
          }
        }
      ],
      responses: {
        200: {
          description: 'Cliente atualizado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Cliente atualizado com sucesso' },
                  data: {
                    type: 'object', example: {
                      id: '9cc2fcaa-9095-4577-90fb-3e13d13525b0',
                      name: 'John Doe',
                      email: 'john.doe@example.com',
                      cpf: '12345678901',
                      phone: '12345678901',
                      address: '1234 Main St, Anytown, USA',
                      createdAt: '2025-05-02T11:29:54.013Z',
                      updatedAt: '2025-05-02T11:31:00.266Z',
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
    },
    delete: {
      summary: `Delete a ${entity}`,
      description: `Delete a ${entity}`,
      tags: [tag],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', example: '9cc2fcaa-9095-4577-90fb-3e13d13525b0' }
        }
      ],
      responses: {
        200: {
          description: 'Cliente deletado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Cliente deletado com sucesso' },
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
    },
  },
};