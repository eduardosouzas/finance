import { LoadBroker } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadBrokerController implements Controller {
  constructor (
    private readonly loadBroker: LoadBroker
  ) { }

  async handle (request: LoadBrokerController.Request): Promise<HttpResponse> {
    try {
      const { id } = request
      if (!id) {
        return forbidden(new InvalidParamError('id'))
      }
      const broker = this.loadBroker.load(id)
      return ok(broker)
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace LoadBrokerController {
  export type Request = {
    id: string
  }
}
