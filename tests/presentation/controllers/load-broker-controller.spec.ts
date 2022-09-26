
import { faker } from '@faker-js/faker/locale/pt_BR'
import { LoadBrokersSpy } from '../mocks'
import { LoadBrokerController } from '@/presentation/controllers'

const mockRequest = (): LoadBrokerController.Request => ({ id: faker.datatype.uuid() })

type SutTypes = {
  sut: LoadBrokerController
  loadBrokersSpy: LoadBrokersSpy
}

const makeSut = (): SutTypes => {
  const loadBrokersSpy = new LoadBrokersSpy()
  const sut = new LoadBrokerController(loadBrokersSpy)
  return {
    sut,
    loadBrokersSpy
  }
}

describe('Load Broker Controller Suit Tests', () => {
  test('Should call Broker with correct value ', async () => {
    const { sut, loadBrokersSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadBrokersSpy.id).toBe(request.id)
  })
})
