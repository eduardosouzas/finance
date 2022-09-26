import { MongoHelper } from '@/infra/db'
import { AddBrokerRepository, LoadBrokerRepository } from '@/data/protocols/db'

export class BrokerMongoRepository implements AddBrokerRepository {
  async add (data: AddBrokerRepository.Params): Promise<AddBrokerRepository.Result> {
    const result = await MongoHelper.insertOne('brokers', data)
    return result !== null
  }

  async load (id: string): Promise<LoadBrokerRepository.Result> {
    const brokerCollection = MongoHelper.getCollection('brokers')
    const broker = await brokerCollection.findOne({
      id
    }, {
      projection: {
        id: 1,
        name: 1,
        description: 1
      }
    })
    return broker && MongoHelper.map(broker)
  }
}
