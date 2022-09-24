import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    brokers: [Broker!]! 
  }

  extend type Mutation {
    saveBroker (brokerId: String!): Broker!
  }

  type Broker {
    id: ID!
    name: String!
    description: String!
    date: DateTime!
  }
`
