import { DbAllBroker } from '@/data/usecases'
import { AllBroker } from '@/domain/usecases'
import { BrokerMongoRepository } from '@/infra/db'

export const makeDbAllBroker = (): AllBroker => {
  const brokerMongoRepository = new BrokerMongoRepository()
  return new DbAllBroker(brokerMongoRepository)
}
