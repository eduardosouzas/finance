import { AllBrokersSpy } from '@/tests/presentation/mocks'
import { AllBrokerController } from '@/presentation/controllers'
import { serverError, ok } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'

const mockRequest = (): AllBrokerController.Request => ({})
type SutTypes = {
  sut: AllBrokerController
  allBrokersSpy: AllBrokersSpy
}

const makeSut = (): SutTypes => {
  const allBrokersSpy = new AllBrokersSpy()
  const sut = new AllBrokerController(allBrokersSpy)
  return {
    sut,
    allBrokersSpy
  }
}

describe('get all Broker Controller Suit Tests', () => {
  test('Should call Broker with correct value ', async () => {
    const { sut, allBrokersSpy } = makeSut()
    const request = mockRequest()
    const result = await sut.handle(request)
    expect(result.body).toEqual(allBrokersSpy.brokers)
  })

  test('Should return 500 if LoadSurveyResult throws', async () => {
    const { sut, allBrokersSpy } = makeSut()
    jest.spyOn(allBrokersSpy, 'all').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, allBrokersSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(allBrokersSpy.brokers))
  })
})
