import { AllBroker } from '@/domain/usecases'
import { AllBrokerRepository } from '@/data/protocols'

export class DbAllBroker implements AllBroker {
  constructor (
    private readonly allBrokerRepository: AllBrokerRepository
  ) { }

  async all (): Promise<AllBroker.Result[]> {
    const broker = await this.allBrokerRepository.all()
    if (broker) {
      return broker
    }
    return null
  }
}
