import { AddBroker, LoadBroker } from '@/domain/usecases'

import { faker } from '@faker-js/faker/locale/pt_BR'

export class AddBrokerSpy implements AddBroker {
  params: AddBroker.Params
  result: true

  async add (params: AddBroker.Params): Promise<AddBroker.Result> {
    this.params = params
    return this.result
  }
}

export class LoadBrokersSpy implements LoadBroker {
  id: string
  async load (id: string): Promise<LoadBroker.Result> {
    this.id = id
    return { id: faker.datatype.uuid() }
  }
}
