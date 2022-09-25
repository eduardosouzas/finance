import { adaptResolver } from '@/main/adapters'
import { makeBrokerController } from '@/main/factories'

export default {
  Mutation: {
    broker: async (parent: any, args: any, context: any) => adaptResolver(makeBrokerController(), args, context)
  }
}
