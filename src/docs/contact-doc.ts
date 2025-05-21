const tag = 'Contact';
const entity = 'contact';
const resource = 'contacts';

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
              phone: {
                type: 'string',
                example: '12345678901'
              },
            }
          }
        }
      ],
      responses: {
        201: {
          description: 'Contato criado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Contato criado com sucesso'
                  },
                  data: {
                    type: 'object',
                    example: {
                      id: '9cc2fcaa-9095-4577-90fb-3e13d13525b0',
                      name: 'John Doe',
                      phone: '12345678901',
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
          description: 'Contatos listados com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Contatos listados com sucesso' },
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
          description: 'Contato encontrado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Contato encontrado com sucesso' },
                  data: {
                    type: 'object', example: {
                      id: '9cc2fcaa-9095-4577-90fb-3e13d13525b0',
                      name: 'John Doe',
                      phone: '12345678901',
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
              phone: { type: 'string', example: '12345678901' },
            }
          }
        }
      ],
      responses: {
        200: {
          description: 'Contato atualizado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Contato atualizado com sucesso' },
                  data: {
                    type: 'object', example: {
                      id: '9cc2fcaa-9095-4577-90fb-3e13d13525b0',
                      name: 'John Doe',
                      phone: '12345678901',
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
          description: 'Contato deletado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Contato deletado com sucesso' },
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