import { LoadBroker } from '@/domain/usecases'
import { InvalidParamError } from '../errors'
import { forbidden, ok, serverError } from '../helpers'
import { Controller, HttpResponse } from '../protocols'

export class LoadBrokerController implements Controller {
  constructor (
    private readonly loadBroker: LoadBroker
  ) { }

  async handle (request: LoadBrokerController.Request): Promise<HttpResponse> {
    try {
      const { id } = request
      console.log(request)
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
