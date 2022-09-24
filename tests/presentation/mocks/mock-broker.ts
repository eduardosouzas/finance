import { AddBroker } from '@/domain/usecases'

// import facker from '@faker-js/faker'

export class AddBrokerSpy implements AddBroker {
  params: AddBroker.Params
  result: true

  async add (params: AddBroker.Params): Promise<AddBroker.Result> {
    this.params = params
    return this.result
  }
}
