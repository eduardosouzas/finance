export const brokersSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/broker'
  }
}
