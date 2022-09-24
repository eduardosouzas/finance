import { AddBroker } from '@/domain/usecases'

export interface AddBrokerRepository {
  add: (data: AddBrokerRepository.Params) => Promise<AddBrokerRepository.Result>
}

export namespace AddBrokerRepository {
  export type Params = AddBroker.Params
  export type Result = boolean
}
