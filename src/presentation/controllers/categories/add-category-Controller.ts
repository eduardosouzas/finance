import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, serverError, ok } from '@/presentation/helpers'
import { AddCategory } from '@/domain/usecases'
import { NameInUseError } from '@/presentation/errors'
export class AddCategoryController implements Controller {
  constructor (
    private readonly addCategory: AddCategory,
    private readonly validation: Validation
  ) { }

  async handle (request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { name, description } = request
      const isValid = await this.addCategory.add({
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
export namespace AddCategoryController {
  export type Request = {
    name: string
    description: string
  }
}
