import { adaptResolver } from '@/main/adapters'
import { makeLoadBrokerController } from '@/main/factories'

export default {
  Query: {
    surveys: async (parent: any, args: any, context: any) => adaptResolver(makeLoadBrokerController(), args, context)
  }
}
