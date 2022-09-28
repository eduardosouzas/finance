import { AllBroker } from '@/domain/usecases'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, serverError, ok } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class AllBrokerController implements Controller {
  constructor (
    private readonly allBroker: AllBroker
  ) { }

  async handle (request: AllBrokerController.Request): Promise<HttpResponse> {
    try {
      const brokers = await this.allBroker.all()
      if (!brokers) {
        return forbidden(new AccessDeniedError())
      }
      return ok(brokers)
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace AllBrokerController {
  export type Request = {}
}
