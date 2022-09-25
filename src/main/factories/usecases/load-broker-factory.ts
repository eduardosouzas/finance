import { LoadBroker } from '@/domain/usecases'
import { DbLoadBroker } from '@/data/usecases'
import { BrokerMongoRepository } from '@/infra/db'

export const makeDbLoadBroker = (): LoadBroker => {
  const brokerMongoRepository = new BrokerMongoRepository()
  return new DbLoadBroker(brokerMongoRepository)
}
