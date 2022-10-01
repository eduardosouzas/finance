import { DbAddBroker } from '@/data/usecases'
import { AddBroker } from '@/domain/usecases'
import { BrokerMongoRepository } from '@/infra/db'

export const makeDbAddBroker = (): AddBroker => {
  const brokerMongoRepository = new BrokerMongoRepository()
  return new DbAddBroker(brokerMongoRepository)
}
