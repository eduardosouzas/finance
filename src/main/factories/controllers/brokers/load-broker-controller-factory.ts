import { makeLogControllerDecorator, makeDbLoadBroker } from '@/main/factories'
import { LoadBrokerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadBrokerController = (): Controller => {
  const controller = new LoadBrokerController(makeDbLoadBroker())
  return makeLogControllerDecorator(controller)
}
