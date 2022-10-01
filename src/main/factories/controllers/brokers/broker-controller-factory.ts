import { makeBrokerValidation, makeLogControllerDecorator, makeDbAddBroker } from '@/main/factories'
import { BrokerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeBrokerController = (): Controller => {
  const controller = new BrokerController(makeDbAddBroker(), makeBrokerValidation())
  return makeLogControllerDecorator(controller)
}
