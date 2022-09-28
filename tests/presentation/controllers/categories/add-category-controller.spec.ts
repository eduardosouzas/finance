import { ValidationSpy, AddCategorySpy } from '@/tests/presentation/mocks'
import { AddCategoryController } from '@/presentation/controllers'
import { throwError } from '@/tests/domain/mocks'

import { faker } from '@faker-js/faker/locale/pt_BR'
import { badRequest, forbidden, serverError } from '@/presentation/helpers'
import { MissingParamError, NameInUseError, ServerError } from '@/presentation/errors'

const mockRequest = (): AddCategoryController.Request => {
  return {
    name: faker.finance.transactionType(),
    description: faker.finance.accountName()
  }
}

type SutTypes = {
  sut: AddCategoryController
  addCategorySpy: AddCategorySpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addCategorySpy = new AddCategorySpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddCategoryController(addCategorySpy, validationSpy)
  return {
    sut,
    addCategorySpy,
    validationSpy
  }
}

describe('Category Controller', () => {
  test('Should return 500 if AddCategory', async () => {
    const { sut, addCategorySpy } = makeSut()
    jest.spyOn(addCategorySpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call addCategory with correct values', async () => {
    const { sut, addCategorySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addCategorySpy.params).toEqual({
      name: request.name,
      description: request.description
    })
  })
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
  test('Should return 403 if addCategory returns false', async () => {
    const { sut, addCategorySpy } = makeSut()
    addCategorySpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new NameInUseError()))
  })
})
