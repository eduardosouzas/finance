import { LoadBroker } from '@/domain/usecases'
import { LoadBrokerRepository } from '@/data/protocols'

export class DbLoadBroker implements LoadBroker {
  constructor (
    private readonly loadBrokerRepository: LoadBrokerRepository
  ) { }

  async load (id: string): Promise<LoadBroker.Result> {
    const broker = await this.loadBrokerRepository.load(id)
    if (broker) {
      return broker
    }
    return null
  }
}
