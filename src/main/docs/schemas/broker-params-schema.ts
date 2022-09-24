export const brokerParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    }
  },
  required: ['name', 'description']
}
