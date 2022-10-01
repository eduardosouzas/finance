import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    brokerById (id: String!): Broker! @auth
    brokers: [Broker!]! @auth
  }

  type Broker {
    id: ID!
    name: String!
    description: String!
    date: DateTime!
  }
`
