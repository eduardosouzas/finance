import { AddBrokerRepository } from '@/data/protocols'

// import { faker } from '@faker-js/faker/locale/pt_BR'

export class AddBrokerRepositorySpy implements AddBrokerRepository {
  params: AddBrokerRepository.Params
  result = true

  async add (params: AddBrokerRepository.Params): Promise<AddBrokerRepository.Result> {
    this.params = params
    return this.result
  }
}
