import { makeLogControllerDecorator, makeDbAllBroker } from '@/main/factories'
import { AllBrokerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeAllBrokerController = (): Controller => {
  const controller = new AllBrokerController(makeDbAllBroker())
  return makeLogControllerDecorator(controller)
}
