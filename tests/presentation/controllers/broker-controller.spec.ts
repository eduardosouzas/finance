import { BrokerController } from '@/presentation/controllers'
import { ServerError } from '@/presentation/errors'
import { serverError } from '@/presentation/helpers'
import { ValidationSpy, AddBrokerSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import { faker } from '@faker-js/faker/locale/pt_BR'

const mockRequest = (): BrokerController.Request => {
  return {
    name: faker.company.name(),
    description: faker.company.bsAdjective()
  }
}

type SutTypes = {
  sut: BrokerController
  addBrokerSpy: AddBrokerSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addBrokerSpy = new AddBrokerSpy()
  const validationSpy = new ValidationSpy()
  const sut = new BrokerController(addBrokerSpy, validationSpy)
  return {
    sut,
    addBrokerSpy,
    validationSpy
  }
}

describe('Broker Controller', () => {
  test('Should return 500 if AddBroker throws', async () => {
    const { sut, addBrokerSpy } = makeSut()
    jest.spyOn(addBrokerSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  // test('Should call AddAccount with correct values', async () => {
  //   const { sut, addAccountSpy } = makeSut()
  //   const request = mockRequest()
  //   await sut.handle(request)
  //   expect(addAccountSpy.params).toEqual({
  //     name: request.name,
  //     email: request.email,
  //     password: request.password
  //   })
  // })

  // test('Should return 403 if AddAccount returns false', async () => {
  //   const { sut, addAccountSpy } = makeSut()
  //   addAccountSpy.result = false
  //   const httpResponse = await sut.handle(mockRequest())
  //   expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  // })

  // test('Should return 200 if valid data is provided', async () => {
  //   const { sut, authenticationSpy } = makeSut()
  //   const httpResponse = await sut.handle(mockRequest())
  //   expect(httpResponse).toEqual(ok(authenticationSpy.result))
  // })

  // test('Should call Validation with correct value', async () => {
  //   const { sut, validationSpy } = makeSut()
  //   const request = mockRequest()
  //   await sut.handle(request)
  //   expect(validationSpy.input).toEqual(request)
  // })

  // test('Should return 400 if Validation returns an error', async () => {
  //   const { sut, validationSpy } = makeSut()
  //   validationSpy.error = new MissingParamError(faker.random.word())
  //   const httpResponse = await sut.handle(mockRequest())
  //   expect(httpResponse).toEqual(badRequest(validationSpy.error))
  // })

  // test('Should call Authentication with correct values', async () => {
  //   const { sut, authenticationSpy } = makeSut()
  //   const request = mockRequest()
  //   await sut.handle(request)
  //   expect(authenticationSpy.params).toEqual({
  //     email: request.email,
  //     password: request.password
  //   })
  // })

  // test('Should return 500 if Authentication throws', async () => {
  //   const { sut, authenticationSpy } = makeSut()
  //   jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
  //   const httpResponse = await sut.handle(mockRequest())
  //   expect(httpResponse).toEqual(serverError(new Error()))
  // })
})
