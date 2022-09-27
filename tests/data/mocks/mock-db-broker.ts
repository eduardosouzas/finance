import { AddBrokerRepository, LoadBrokerRepository, AllBrokerRepository } from '@/data/protocols'

import { faker } from '@faker-js/faker/locale/pt_BR'

export class AddBrokerRepositorySpy implements AddBrokerRepository {
  params: AddBrokerRepository.Params
  result = true

  async add (params: AddBrokerRepository.Params): Promise<AddBrokerRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadBrokerRepositorySpy implements LoadBrokerRepository {
  result = {
    id: faker.datatype.uuid(),
    name: faker.company.name(),
    description: faker.company.bsAdjective()
  }

  async load (id: string): Promise<LoadBrokerRepository.Result> {
    return this.result
  }
}

export class AllBrokerRepositorySpy implements AllBrokerRepository {
  brokers: AllBrokerRepository.Result[] = []

  async all (): Promise<AllBrokerRepository.Result[]> {
    for (let i = 0; i < 10; i++) {
      this.brokers.push({
        id: faker.datatype.uuid(),
        name: faker.company.name(),
        description: faker.company.bsAdjective()
      })
    }
    return this.brokers
  }
}
