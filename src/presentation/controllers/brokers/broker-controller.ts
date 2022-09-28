import { AddBroker } from '@/domain/usecases'
import { NameInUseError } from '@/presentation/errors'
import { badRequest, forbidden, serverError, ok } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class BrokerController implements Controller {
  constructor (
    private readonly addBroker: AddBroker,
    private readonly validation: Validation
  ) { }

  async handle (request: BrokerController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { name, description } = request
      const isValid = await this.addBroker.add({
        name,
        description
      })
      if (!isValid) {
        return forbidden(new NameInUseError())
      }
      return ok(isValid)
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace BrokerController {
  export type Request = {
    name: string
    description: string
  }
}
