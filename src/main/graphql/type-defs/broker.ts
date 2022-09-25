import { gql } from 'apollo-server-express'

export default gql`
  extend type Mutation {
    broker (brokerId: String!): Broker!
  }

  type Broker {
    id: ID!
    name: String!
    description: String!
    date: DateTime!
  }
`
