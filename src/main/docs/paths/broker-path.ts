export const brokerPath: any = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Broker'],
    summary: 'API listar todas as Corretora cadastradas',
    description: 'Essa rota pode ser executada por **qualquer usuário** autenticado',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/brokers'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Broker'],
    summary: 'API para criar uma Corretora',
    description: 'Essa rota pode ser executada por **qualquer usuário**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/brokerParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/broker'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
