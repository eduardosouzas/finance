import { makeDbAddCategory, makeLogControllerDecorator, makeCategoryValidation } from '@/main/factories'
import { AddCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeAddCategoryController = (): Controller => {
  const controller = new AddCategoryController(makeDbAddCategory(), makeCategoryValidation())
  return makeLogControllerDecorator(controller)
}
