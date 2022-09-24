import { MongoHelper } from '@/infra/db'
import { AddBrokerRepository } from '@/data/protocols/db'

export class BrokerMongoRepository implements AddBrokerRepository {
  async add (data: AddBrokerRepository.Params): Promise<AddBrokerRepository.Result> {
    const accountCollection = MongoHelper.getCollection('brokers')
    const result = await accountCollection.insertOne(data)
    return result.insertedId !== null
  }
}
