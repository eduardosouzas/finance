import { DbLoadBroker } from '@/data/usecases'
import { mockLoadBrokerParams, throwError } from '@/tests/domain/mocks'
import { LoadBrokerRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbLoadBroker
  loadBrokerRepositorySpy: LoadBrokerRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadBrokerRepositorySpy = new LoadBrokerRepositorySpy()
  const sut = new DbLoadBroker(loadBrokerRepositorySpy)
  return {
    sut,
    loadBrokerRepositorySpy
  }
}

describe('DbLoadBroker Usecase', () => {
  test('Should call LoadBrokerRepository with correct values', async () => {
    const { sut } = makeSut()
    const loadBrokerParams = mockLoadBrokerParams()
    const result = await sut.load(loadBrokerParams.id)
    expect(result).toBeTruthy()
  })

  test('Should throw if loadBrokerRepository throws', async () => {
    const { sut, loadBrokerRepositorySpy } = makeSut()
    jest.spyOn(loadBrokerRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load(mockLoadBrokerParams().id)
    await expect(promise).rejects.toThrow()
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.load(mockLoadBrokerParams().id)
    expect(isValid).toBeTruthy()
  })
})
