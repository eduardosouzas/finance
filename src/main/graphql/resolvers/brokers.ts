import { adaptResolver } from '@/main/adapters'
import { makeAllBrokerController, makeLoadBrokerController } from '@/main/factories'

export default {
  Query: {
    brokerById: async (parent: any, args: any, context: any) => adaptResolver(makeLoadBrokerController(), args, context),
    brokers: async (parent: any, args: any, context: any) => adaptResolver(makeAllBrokerController(), args, context)
  }
}
