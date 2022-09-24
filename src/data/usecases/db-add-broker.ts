import { AddBroker } from '@/domain/usecases'
import { AddBrokerRepository } from '@/data/protocols'

export class DbAddBroker implements AddBroker {
  constructor (
    private readonly addBrokerRepository: AddBrokerRepository
  ) { }

  async add (brokerData: AddBroker.Params): Promise<AddBroker.Result> {
    return await this.addBrokerRepository.add(brokerData)
  }
}
